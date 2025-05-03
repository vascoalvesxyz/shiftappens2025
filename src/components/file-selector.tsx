'use client';

import { useState, useEffect, useMemo } from "react"
import {
  FileText, FileImage, FileCode, FileSpreadsheet,
  FilePieChart, FileAudio, FileVideo, Search, X
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { NoteViewer } from "./note-viewer"
import { CreateNoteModal } from "./create-note-modal"

import '../style/desktop.css'
import { getNoteIcon, Note, NoteType } from "@/lib/types";

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

export function FileSelector({
  drawer,
  onClose,
}: {
  drawer: number
  onClose: () => void
}) {
  const [searchQuery, setSearchQuery] = useState("")
  const [notes, setNotes] = useState<Note[]>([])
  const [selectedNote, setSelectedNote] = useState<Note | null>(null)
  const [noteViewerOpen, setNoteViewerOpen] = useState(false)

  function fetchNotes() {
    const allNotes: Note[] = []

    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i)
      if (!key) continue

      const match = key.match(/^(\d+)\s+(\d+)$/)
      if (!match) continue

      const [_, drawerId, noteId] = match
      if (parseInt(drawerId) !== drawer) continue

      const storedValue = localStorage.getItem(key) || ""
      allNotes.push({
        drawer: parseInt(drawerId),
        id: parseInt(noteId),
        type: storedValue.split("|")[0] as NoteType || "document",
        title: storedValue.split("|")[1] || "",
        content: "",
      })
    }

    setNotes(allNotes)
  }

  useEffect(() => {
    fetchNotes();
  }, [drawer])

  // ESC key closes the selector
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [onClose])

  const filteredNotes = useMemo(() => {
    const query = searchQuery.toLowerCase().trim()
    if (!query) return notes
    return notes.filter(note =>
      note.title.toLowerCase().includes(query) ||
      note.type.toLowerCase().includes(query)
    )
  }, [searchQuery, notes])

  const handleSelectNote = (note: Note) => {
    setSelectedNote(note)
    setNoteViewerOpen(true)
  }

  return (
    <div className="card">
      <button
        className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition"
        onClick={onClose}
        aria-label="Close"
      >
        <X className="w-5 h-5" />
      </button>

      {noteViewerOpen && selectedNote ? (
        <NoteViewer
          drawer={selectedNote.drawer}
          noteId={selectedNote.id}
          noteType={selectedNote.type}
          noteTitle={selectedNote.title}
          isOpen={noteViewerOpen}
          onOpenChange={setNoteViewerOpen}
          onNoteDeleted={() => {
            setSelectedNote(null)
            setNoteViewerOpen(false)
            setNotes((prev) => prev.filter(n => n.id !== selectedNote.id))
          }}
          onNoteUpdated={() => {
            fetchNotes()
          }}
        />
      ) : (
        <>
          <div className="card-section-container">
            <div className="card-header">Drawer {drawer}</div>
            <p className="card-subtext"> Browse or search through your notes. </p>
          </div>

          <CreateNoteModal
            drawer={drawer}
            onNoteCreated={(newNote: Note) => {
              setNotes((prev) => [...prev, newNote])
            }}
          />

          <div className="card-section-container">
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
            {notes.length > 0 ? (
              filteredNotes.length > 0 ? (
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
              )
            )
              : (
              <div className="flex items-center justify-center h-32 text-muted-foreground">
              No notes found.
                </div>
              )
            }
          </div>
        </>
      )}
    </div>
  )
}
