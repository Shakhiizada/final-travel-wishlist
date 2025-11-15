"use client"
import type React from "react"
import { useState, useEffect } from "react"
import type { Place } from "@/lib/places"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface PlaceDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  place?: Place | null
  onSave: (data: {
    name: string
    country: string
    description: string
    photoUrl: string
    status: "wishlist" | "visited"
  }) => void
}

export function PlaceDialog({ open, onOpenChange, place, onSave }: PlaceDialogProps) {
  const [name, setName] = useState("")
  const [country, setCountry] = useState("")
  const [description, setDescription] = useState("")
  const [photoUrl, setPhotoUrl] = useState("")
  const [status, setStatus] = useState<"wishlist" | "visited">("wishlist")

  useEffect(() => {
    if (place) {
      setName(place.name)
      setCountry(place.country)
      setDescription(place.description)
      setPhotoUrl(place.photoUrl)
      setStatus(place.status)
    } else {
      setName("")
      setCountry("")
      setDescription("")
      setPhotoUrl("")
      setStatus("wishlist")
    }
  }, [place, open])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave({ name, country, description, photoUrl, status })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{place ? "Редактировать место" : "Добавить место"}</DialogTitle>
          <DialogDescription>
            {place ? "Измените информацию о месте" : "Добавьте новое место в ваш список"}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Название *</Label>
            <Input id="name" placeholder="Париж" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="country">Страна/Город *</Label>
            <Input
              id="country"
              placeholder="Франция"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Описание</Label>
            <Textarea
              id="description"
              placeholder="Город любви и романтики..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="photoUrl">URL фото</Label>
            <Input
              id="photoUrl"
              type="url"
              placeholder="https://example.com/photo.jpg"
              value={photoUrl}
              onChange={(e) => setPhotoUrl(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="status">Статус</Label>
            <Select value={status} onValueChange={(value) => setStatus(value as "wishlist" | "visited")}>
              <SelectTrigger id="status">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="wishlist">В планах</SelectItem>
                <SelectItem value="visited">Посещено</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Отмена
            </Button>
            <Button type="submit">{place ? "Сохранить" : "Добавить"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
