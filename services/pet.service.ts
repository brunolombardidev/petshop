import { apiClient } from "@/lib/api-client"

export interface Pet {
  id: string
  name: string
  species: "dog" | "cat" | "bird" | "fish" | "rabbit" | "hamster" | "other"
  breed: string
  age: number
  weight: number
  color: string
  gender: "male" | "female"
  neutered: boolean
  microchip?: string
  imageUrl?: string
  ownerId: string
  medicalHistory: MedicalRecord[]
  vaccinations: Vaccination[]
  createdAt: string
  updatedAt: string
}

export interface MedicalRecord {
  id: string
  petId: string
  date: string
  type: "consultation" | "surgery" | "exam" | "treatment" | "emergency"
  veterinarian: string
  clinic: string
  diagnosis: string
  treatment: string
  medications: string[]
  notes?: string
  attachments: string[]
  createdAt: string
}

export interface Vaccination {
  id: string
  petId: string
  vaccine: string
  date: string
  nextDue?: string
  veterinarian: string
  clinic: string
  batch?: string
  notes?: string
  createdAt: string
}

export interface CreatePetRequest {
  name: string
  species: Pet["species"]
  breed: string
  age: number
  weight: number
  color: string
  gender: Pet["gender"]
  neutered: boolean
  microchip?: string
  imageUrl?: string
}

export interface UpdatePetRequest extends Partial<CreatePetRequest> {}

export interface CreateMedicalRecordRequest {
  date: string
  type: MedicalRecord["type"]
  veterinarian: string
  clinic: string
  diagnosis: string
  treatment: string
  medications: string[]
  notes?: string
  attachments?: string[]
}

export interface CreateVaccinationRequest {
  vaccine: string
  date: string
  nextDue?: string
  veterinarian: string
  clinic: string
  batch?: string
  notes?: string
}

export interface PetFilters {
  species?: Pet["species"]
  breed?: string
  ageMin?: number
  ageMax?: number
  gender?: Pet["gender"]
  neutered?: boolean
}

class PetService {
  // Pet CRUD operations
  async getPets(filters?: PetFilters): Promise<Pet[]> {
    const params = new URLSearchParams()

    if (filters?.species) params.append("species", filters.species)
    if (filters?.breed) params.append("breed", filters.breed)
    if (filters?.ageMin) params.append("ageMin", filters.ageMin.toString())
    if (filters?.ageMax) params.append("ageMax", filters.ageMax.toString())
    if (filters?.gender) params.append("gender", filters.gender)
    if (filters?.neutered !== undefined) params.append("neutered", filters.neutered.toString())

    const response = await apiClient.get(`/pets?${params.toString()}`)
    return response.data
  }

  async getPet(id: string): Promise<Pet> {
    const response = await apiClient.get(`/pets/${id}`)
    return response.data
  }

  async createPet(data: CreatePetRequest): Promise<Pet> {
    const response = await apiClient.post("/pets", data)
    return response.data
  }

  async updatePet(id: string, data: UpdatePetRequest): Promise<Pet> {
    const response = await apiClient.put(`/pets/${id}`, data)
    return response.data
  }

  async deletePet(id: string): Promise<void> {
    await apiClient.delete(`/pets/${id}`)
  }

  // Medical Records
  async getMedicalRecords(petId: string): Promise<MedicalRecord[]> {
    const response = await apiClient.get(`/pets/${petId}/medical-records`)
    return response.data
  }

  async getMedicalRecord(petId: string, recordId: string): Promise<MedicalRecord> {
    const response = await apiClient.get(`/pets/${petId}/medical-records/${recordId}`)
    return response.data
  }

  async createMedicalRecord(petId: string, data: CreateMedicalRecordRequest): Promise<MedicalRecord> {
    const response = await apiClient.post(`/pets/${petId}/medical-records`, data)
    return response.data
  }

  async updateMedicalRecord(
    petId: string,
    recordId: string,
    data: Partial<CreateMedicalRecordRequest>,
  ): Promise<MedicalRecord> {
    const response = await apiClient.put(`/pets/${petId}/medical-records/${recordId}`, data)
    return response.data
  }

  async deleteMedicalRecord(petId: string, recordId: string): Promise<void> {
    await apiClient.delete(`/pets/${petId}/medical-records/${recordId}`)
  }

  // Vaccinations
  async getVaccinations(petId: string): Promise<Vaccination[]> {
    const response = await apiClient.get(`/pets/${petId}/vaccinations`)
    return response.data
  }

  async getVaccination(petId: string, vaccinationId: string): Promise<Vaccination> {
    const response = await apiClient.get(`/pets/${petId}/vaccinations/${vaccinationId}`)
    return response.data
  }

  async createVaccination(petId: string, data: CreateVaccinationRequest): Promise<Vaccination> {
    const response = await apiClient.post(`/pets/${petId}/vaccinations`, data)
    return response.data
  }

  async updateVaccination(
    petId: string,
    vaccinationId: string,
    data: Partial<CreateVaccinationRequest>,
  ): Promise<Vaccination> {
    const response = await apiClient.put(`/pets/${petId}/vaccinations/${vaccinationId}`, data)
    return response.data
  }

  async deleteVaccination(petId: string, vaccinationId: string): Promise<void> {
    await apiClient.delete(`/pets/${petId}/vaccinations/${vaccinationId}`)
  }

  // Utility methods
  async getBreedsBySpecies(species: Pet["species"]): Promise<string[]> {
    const response = await apiClient.get(`/pets/breeds/${species}`)
    return response.data
  }

  async uploadPetImage(petId: string, file: File): Promise<string> {
    const formData = new FormData()
    formData.append("image", file)

    const response = await apiClient.post(`/pets/${petId}/image`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    return response.data.imageUrl
  }

  async getVaccinationSchedule(petId: string): Promise<Vaccination[]> {
    const response = await apiClient.get(`/pets/${petId}/vaccination-schedule`)
    return response.data
  }

  async getPetStatistics(): Promise<{
    totalPets: number
    petsBySpecies: Record<Pet["species"], number>
    averageAge: number
    neuteredPercentage: number
  }> {
    const response = await apiClient.get("/pets/statistics")
    return response.data
  }
}

export const petService = new PetService()
export { PetService }
