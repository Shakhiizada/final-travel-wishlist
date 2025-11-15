export interface Place {
  id: string
  name: string
  country: string
  description: string
  photoUrl: string
  status: "wishlist" | "visited"
  userId: string
  createdAt: string
}

export function getPlaces(userId: string): Place[] {
  if (typeof window === "undefined") return []
  const places = localStorage.getItem("places")
  const allPlaces: Place[] = places ? JSON.parse(places) : []
  return allPlaces.filter((p) => p.userId === userId)
}

export function addPlace(place: Omit<Place, "id" | "createdAt">): { success: boolean; message: string } {
  if (!place.name || !place.country) {
    return { success: false, message: "Название и страна обязательны" }
  }

  const places = getAllPlaces()
  const newPlace: Place = {
    ...place,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
  }

  places.push(newPlace)
  localStorage.setItem("places", JSON.stringify(places))

  return { success: true, message: "Место успешно добавлено!" }
}

export function updatePlace(id: string, updates: Partial<Place>): { success: boolean; message: string } {
  const places = getAllPlaces()
  const index = places.findIndex((p) => p.id === id)

  if (index === -1) {
    return { success: false, message: "Место не найдено" }
  }

  places[index] = { ...places[index], ...updates }
  localStorage.setItem("places", JSON.stringify(places))

  return { success: true, message: "Место успешно обновлено!" }
}

export function deletePlace(id: string): { success: boolean; message: string } {
  const places = getAllPlaces()
  const filtered = places.filter((p) => p.id !== id)

  localStorage.setItem("places", JSON.stringify(filtered))

  return { success: true, message: "Место успешно удалено!" }
}

export function toggleStatus(id: string): { success: boolean; message: string } {
  const places = getAllPlaces()
  const place = places.find((p) => p.id === id)

  if (!place) {
    return { success: false, message: "Место не найдено" }
  }

  place.status = place.status === "wishlist" ? "visited" : "wishlist"
  localStorage.setItem("places", JSON.stringify(places))

  return { success: true, message: "Статус успешно изменен!" }
}

function getAllPlaces(): Place[] {
  if (typeof window === "undefined") return []
  const places = localStorage.getItem("places")
  return places ? JSON.parse(places) : []
}
