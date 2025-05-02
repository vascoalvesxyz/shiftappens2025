'use client';

import { useState, useEffect, useMemo } from "react"
import {
  FileText, FileImage, FileCode, FileSpreadsheet,
  FilePieChart, FileAudio, FileVideo, Search
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Dialog, DialogContent, DialogDescription, DialogHeader,
  DialogTitle, DialogTrigger
} from "@/components/ui/dialog"
import { NoteViewer } from "./note-viewer"
import { CreateNoteModal } from "./create-note-modal";

const getNoteIcon = (type: NoteType) => {
  switch (type) {
    case "document": return <FileText className="h-4 w-4 text-blue-500" />
    case "image": return <FileImage className="h-4 w-4 text-green-500" />
    case "code": return <FileCode className="h-4 w-4 text-purple-500" />
    case "spreadsheet": return <FileSpreadsheet className="h-4 w-4 text-emerald-500" />
    case "chart": return <FilePieChart className="h-4 w-4 text-orange-500" />
    case "audio": return <FileAudio className="h-4 w-4 text-red-500" />
    case "video": return <FileVideo className="h-4 w-4 text-pink-500" />
    default: return <FileText className="h-4 w-4 text-gray-500" />
  }
}

const NoteItem = ({ note, onSelect }: { note: Note, onSelect: (note: Note) => void }) => (
  <div
    className={cn(
      "flex items-center gap-3 px-3 py-2 rounded-md cursor-pointer hover:bg-muted/50 transition-colors",
      "border-l-2 border-transparent hover:border-primary/30",
    )}
    onClick={() => onSelect(note)}
  >
    <div className="flex items-center justify-center w-5">{getNoteIcon(note.type)}</div>
    <span className="truncate">{note.title}</span>
    <span className="ml-auto text-xs text-muted-foreground capitalize">{note.type}</span>
  </div>
)

export function FileSelector({ drawer }: { drawer: number }) {
  const [searchQuery, setSearchQuery] = useState("")
  const [notes, setNotes] = useState<Note[]>([])
  const [selectedNote, setSelectedNote] = useState<Note| null>(null)
  const [isOpen, setIsOpen] = useState(false)
  const [noteViewerOpen, setNoteViewerOpen] = useState(false)

  // Load notes from localStorage
  useEffect(() => {
    const allNotes: Note[] = []

    console.log(
      `Loading notes for drawer ${drawer} from localStorage...`,
      `Total items in localStorage: ${localStorage.length}`,
    )
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i)
      if (!key) continue

      const match = key.match(/^(\d+)\s+(\d+)$/)
      if (!match) continue
        console.log(match)

      const [_, drawerId, noteId] = match
      if (parseInt(drawerId) !== drawer) continue

      const storedValue = localStorage.getItem(key) || ""

      allNotes.push({
        drawer: parseInt(drawerId),
        id: parseInt(noteId),
        type: storedValue.split("|")[0] as NoteType || "document" as NoteType, // or determine dynamically if needed
        title: storedValue.split("|")[1] || "",
        content: "", // or load from elsewhere if applicable
      })
    }

    setNotes(allNotes)
  }, [isOpen])

  const filteredNotes = useMemo(() => {
    if (!searchQuery.trim()) return notes
    const query = searchQuery.toLowerCase()
    return notes.filter(
      (note) =>
        note.title.toLowerCase().includes(query) ||
        note.type.toLowerCase().includes(query),
    )
  }, [searchQuery, notes])

  const handleSelectNote = (note: Note) => {
    setSelectedNote(note)
    setNoteViewerOpen(true)
    setIsOpen(false)
  }

  return (
    <>
      {noteViewerOpen && selectedNote ? (
        <NoteViewer
          drawer={selectedNote.drawer}
          noteId={selectedNote.id}
          noteType={selectedNote.type}
          noteTitle={selectedNote.title}
          isOpen={noteViewerOpen}
          onOpenChange={setNoteViewerOpen}
          onNoteDeleted={() => {
            setIsOpen(true)
            setSelectedNote(null)
            setNoteViewerOpen(false)
            setNotes((prev) => prev.filter(n => n.id !== selectedNote.id))
          }}
          onNoteUpdated={() => {
            const updated = localStorage.getItem(`${selectedNote.drawer} ${selectedNote.id}`)
            if (updated) {
              setSelectedNote({ ...selectedNote, content: updated })
            }
          }}
        />
      ) : (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button variant="outline">Open File Selector</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Drawer {drawer}</DialogTitle>
              <DialogDescription>Browse or search through your notes.</DialogDescription>
            </DialogHeader>

            <CreateNoteModal 
              drawer={1}
              onNoteCreated={(newNote: Note) => {
                setNotes((prev) => [...prev, newNote])
                setIsOpen(true)
              }}
            />

            <div className="mt-4 relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search notes..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="mt-2 max-h-[60vh] overflow-y-auto border rounded-md bg-card p-2">
              {filteredNotes.length > 0 ? (
                <div className="space-y-1">
                  {filteredNotes.map((note) => (
                    <NoteItem
                      key={`${note.drawer}-${note.id}-${note.title}`}
                      note={note}
                      onSelect={handleSelectNote}
                    />
                  ))}
                </div>
              ) : (
                <div className="flex items-center justify-center h-32 text-muted-foreground">
                  No notes found matching your search.
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  )
}
