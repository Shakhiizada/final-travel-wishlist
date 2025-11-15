"use client"
import type { Place } from "@/lib/places"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, Edit, Trash2, CheckCircle2, Circle } from "lucide-react"

interface PlaceCardProps {
  place: Place
  onEdit: (place: Place) => void
  onDelete: (id: string) => void
  onToggleStatus: (id: string) => void
}

export function PlaceCard({ place, onEdit, onDelete, onToggleStatus }: PlaceCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-xl transition-shadow">
      <CardHeader className="p-0">
        {place.photoUrl ? (
          <img src={place.photoUrl || "/placeholder.svg"} alt={place.name} className="w-full h-48 object-cover" />
        ) : (
          <div className="w-full h-48 bg-gradient-to-br from-blue-200 to-cyan-200 flex items-center justify-center">
            <MapPin className="h-16 w-16 text-blue-500/30" />
          </div>
        )}
      </CardHeader>

      <CardContent className="p-4 space-y-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-lg truncate">{place.name}</h3>
            <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
              <MapPin className="h-3 w-3" />
              {place.country}
            </p>
          </div>
          <Badge variant={place.status === "visited" ? "default" : "secondary"}>
            {place.status === "visited" ? "Посещено" : "В планах"}
          </Badge>
        </div>

        <p className="text-sm text-muted-foreground line-clamp-2">{place.description || "Нет описания"}</p>
      </CardContent>

      <CardFooter className="p-4 pt-0 flex gap-2">
        <Button onClick={() => onToggleStatus(place.id)} variant="outline" size="sm" className="flex-1">
          {place.status === "visited" ? (
            <>
              <Circle className="h-4 w-4 mr-2" /> В планы
            </>
          ) : (
            <>
              <CheckCircle2 className="h-4 w-4 mr-2" />
              Посещено
            </>
          )}
        </Button>
        <Button onClick={() => onEdit(place)} variant="outline" size="sm">
          <Edit className="h-4 w-4" />
        </Button>
        <Button onClick={() => onDelete(place.id)} variant="outline" size="sm">
          <Trash2 className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  )
}
