"use client"
import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { User, Camera, Trash2 } from "lucide-react"
import { getProfile, updateProfile, deleteProfilePhoto, type UserProfile } from "@/lib/profile"

interface ProfileDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  userEmail: string
  onUpdate: () => void
}

export function ProfileDialog({ open, onOpenChange, userEmail, onUpdate }: ProfileDialogProps) {
  const [profile, setProfile] = useState<UserProfile>({ email: userEmail, name: "", photoUrl: "" })
  const [name, setName] = useState("")
  const [photoUrl, setPhotoUrl] = useState("")

  useEffect(() => {
    if (open && userEmail) {
      const userProfile = getProfile(userEmail)
      setProfile(userProfile)
      setName(userProfile.name)
      setPhotoUrl(userProfile.photoUrl)
    }
  }, [open, userEmail])

  const handleSave = () => {
    const result = updateProfile(userEmail, name, photoUrl)
    if (result.success) {
      onUpdate()
      onOpenChange(false)
    }
  }

  const handleDeletePhoto = () => {
    if (confirm("Удалить фото профиля?")) {
      const result = deleteProfilePhoto(userEmail)
      if (result.success) {
        setPhotoUrl("")
        setProfile({ ...profile, photoUrl: "" })
      }
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Редактировать профиль</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="flex items-center gap-4">
            {photoUrl ? (
              <img src={photoUrl || "/placeholder.svg"} alt="Profile" className="h-20 w-20 rounded-full object-cover" />
            ) : (
              <div className="h-20 w-20 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                <User className="h-10 w-10 text-white" />
              </div>
            )}
            {photoUrl && (
              <Button onClick={handleDeletePhoto} variant="ghost" size="sm">
                <Trash2 className="h-4 w-4 mr-2" />
                Удалить фото
              </Button>
            )}
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="profile-name">Имя</Label>
              <Input id="profile-name" value={name} onChange={(e) => setName(e.target.value)} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="profile-photo">URL фото профиля</Label>
              <div className="flex gap-2">
                <Input
                  id="profile-photo"
                  type="url"
                  placeholder="https://example.com/photo.jpg"
                  value={photoUrl}
                  onChange={(e) => setPhotoUrl(e.target.value)}
                />
                <Button type="button" variant="outline" size="icon">
                  <Camera className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">Вставьте ссылку на изображение</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="profile-email">Email</Label>
              <Input id="profile-email" value={userEmail} disabled />
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Отмена
            </Button>
            <Button onClick={handleSave}>Сохранить</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
