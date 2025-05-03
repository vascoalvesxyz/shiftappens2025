import {
  FileText, FileImage, FileCode, FileSpreadsheet,
  FilePieChart, FileAudio, FileVideo, StickyNote
} from "lucide-react"

export type NoteType = "document" | "code" | "temporary"

export type Note = {
  drawer: number
  id: number
  type: NoteType
  title: string
  content: string
}

export const getNoteIcon = (type: NoteType) => {
  switch (type) {
    case "document": return <FileText className="h-4 w-4 text-blue-500" />
    case "code": return <FileCode className="h-4 w-4 text-purple-500" />
    case "temporary": return <StickyNote className="h-4 w-4 text-emerald-500" />
    default: return <FileText className="h-4 w-4 text-gray-500" />
  }
}

export const noteTypes = [
  { value: "document", label: "Document", icon: <FileText className="mr-2 h-4 w-4 text-blue-500" /> },
  { value: "code", label: "Code", icon: <FileCode className="mr-2 h-4 w-4 text-purple-500" /> },
  { value: "temporary", label: "Temporary", icon: <StickyNote className="mr-2 h-4 w-4 text-emerald-500" /> },
]
