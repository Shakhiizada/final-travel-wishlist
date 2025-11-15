export interface UserProfile {
  email: string
  name: string
  photoUrl: string
}

export function getProfile(email: string): UserProfile {
  if (typeof window === "undefined") {
    return { email, name: "", photoUrl: "" }
  }

  const profiles = localStorage.getItem("profiles")
  const allProfiles: UserProfile[] = profiles ? JSON.parse(profiles) : []
  const profile = allProfiles.find((p) => p.email === email)

  if (profile) {
    return profile
  }

  return { email, name: "", photoUrl: "" }
}

export function updateProfile(email: string, name: string, photoUrl: string): { success: boolean; message: string } {
  if (typeof window === "undefined") {
    return { success: false, message: "Ошибка: недоступно на сервере" }
  }

  const profiles = localStorage.getItem("profiles")
  const allProfiles: UserProfile[] = profiles ? JSON.parse(profiles) : []

  const existingIndex = allProfiles.findIndex((p) => p.email === email)
  const updatedProfile: UserProfile = { email, name, photoUrl }

  if (existingIndex >= 0) {
    allProfiles[existingIndex] = updatedProfile
  } else {
    allProfiles.push(updatedProfile)
  }

  localStorage.setItem("profiles", JSON.stringify(allProfiles))

  return { success: true, message: "Профиль обновлен!" }
}

export function deleteProfilePhoto(email: string): { success: boolean; message: string } {
  if (typeof window === "undefined") {
    return { success: false, message: "Ошибка: недоступно на сервере" }
  }

  const profiles = localStorage.getItem("profiles")
  const allProfiles: UserProfile[] = profiles ? JSON.parse(profiles) : []

  const existingIndex = allProfiles.findIndex((p) => p.email === email)

  if (existingIndex >= 0) {
    allProfiles[existingIndex].photoUrl = ""
    localStorage.setItem("profiles", JSON.stringify(allProfiles))
    return { success: true, message: "Фото удалено!" }
  }

  return { success: false, message: "Профиль не найден" }
}
