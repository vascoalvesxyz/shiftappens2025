type NoteType = "document" | "image" | "code" | "spreadsheet" | "chart" | "audio" | "video"

type Note= {
  drawer: number
  id: number
  type: NoteType
  title: string
  content: string
}
