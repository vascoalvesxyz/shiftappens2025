'use client'

import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Edit, Trash2 } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import MDXRender from '@/components/MDXRender'

const formSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  content: z.string().min(1, 'Content is required'),
})

type NoteFormValues = z.infer<typeof formSchema>
type NoteType =
  | 'document'
  | 'image'
  | 'code'
  | 'spreadsheet'
  | 'chart'
  | 'audio'
  | 'video'

interface Note {
  drawer: number
  id: number
  type: NoteType
  title: string
  content: string
}

interface NoteViewerProps {
  drawer: number
  noteId: number
  noteType: string
  noteTitle: string
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  onNoteDeleted?: () => void
  onNoteUpdated?: () => void
}

export function NoteViewer({
  drawer,
  noteId,
  isOpen,
  onOpenChange,
  onNoteDeleted,
  onNoteUpdated,
}: NoteViewerProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [note, setNote] = useState<Note | null>(null)

  const form = useForm<NoteFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { title: '', content: '' },
  })

  useEffect(() => {
    if (!isOpen) return
    const stored = localStorage.getItem(`${drawer} ${noteId}`)
    if (stored) {
      const [type, title, content] = stored.split('|')
      const newNote: Note = {
        drawer,
        id: noteId,
        type: type as NoteType,
        title,
        content: content || '',
      }
      setNote(newNote)
      form.reset({ title, content: content || '' })
    }
  }, [drawer, noteId, isOpen, form])

  function onSubmit(values: NoteFormValues) {
    if (!note) return
    const key = `${drawer} ${noteId}`
    const newValue = `${note.type}|${values.title}|${values.content}`

    // update localStorage
    if (values.title !== note.title) localStorage.removeItem(key)
    localStorage.setItem(key, newValue)

    setIsEditing(false)
    setNote({ ...note, title: values.title, content: values.content })
    onNoteUpdated?.()
    if (values.title !== note.title) onOpenChange(false)
  }

  function handleDeleteNote() {
    localStorage.removeItem(`${drawer} ${noteId}`)
    setIsDeleteDialogOpen(false)
    onOpenChange(false)
    onNoteDeleted?.()
  }

  return (
    <>
      {/* ————————————————————————————————————————
          Main “Dialog”
      ————————————————————————————————————————— */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
          onClick={() => onOpenChange(false)}
        >
          <div
            className="dialog-content sm:max-w-[900px] max-h-[80vh] w-full bg-card text-card-foreground rounded-md shadow-lg overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {!isEditing ? (
              <>
                {/* Header */}
                <div className="flex items-center justify-between px-4 py-2 bg-muted text-muted-foreground border-b border-border">
                  <h2 className="text-lg font-medium">{note?.title}</h2>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setIsEditing(true)}
                      className="gap-1"
                    >
                      <Edit className="h-4 w-4" />
                      Edit
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => setIsDeleteDialogOpen(true)}
                      className="gap-1"
                    >
                      <Trash2 className="h-4 w-4" />
                      Delete
                    </Button>
                  </div>
                </div>

                {/* Content */}
                <div className="overflow-auto max-h-[500px] p-4">
                  {note?.content ? (
                    <MDXRender mdxString={note.content} />
                  ) : (
                    <p className="italic text-muted-foreground">
                      No content found.
                    </p>
                  )}
                </div>
              </>
            ) : (
              <>
                {/* Edit Mode Header */}
                <div className="px-4 py-2 border-b border-border">
                  <h2 className="text-lg font-medium">Edit Note</h2>
                  <p className="text-sm text-muted-foreground mt-1">
                    Make changes to your note. Click save when you're done.
                  </p>
                </div>

                {/* Form */}
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-4 p-4 overflow-auto max-h-[600px]"
                  >
                    <FormField
                      control={form.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Title</FormLabel>
                          <FormControl>
                            <Input placeholder="Note title" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="content"
                        render={({ field }) => (
                          <FormItem className="space-y-2">
                            <FormLabel>Content</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Write your note..."
                                className="min-h-[350px] max-h-[500px] resize-none font-mono"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <div className="space-y-2">
                        <span className="text-sm font-medium">Preview</span>
                        <div className="rounded-md border border-input p-4 min-h-[350px] overflow-auto max-h-[500px]">
                          {form.watch('content').trim() ? (
                            <MDXRender mdxString={form.watch('content')} />
                          ) : (
                            <p className="text-muted-foreground italic">
                              Nothing to preview…
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-end space-x-2 border-t border-border pt-4">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setIsEditing(false)}
                      >
                        Cancel
                      </Button>
                      <Button type="submit">Save Changes</Button>
                    </div>
                  </form>
                </Form>
              </>
            )}
          </div>
        </div>
      )}

      {/* ————————————————————————————————————————
          Delete Confirmation “AlertDialog”
      ————————————————————————————————————————— */}
      {isDeleteDialogOpen && (
        <div
          className="fixed inset-0 z-60 flex items-center justify-center bg-black/40"
          onClick={() => setIsDeleteDialogOpen(false)}
        >
          <div
            className="alert-dialog-content bg-card text-card-foreground rounded-md shadow-lg p-6 max-w-sm"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-4">
              <h3 className="text-lg font-semibold">Are you sure?</h3>
              <p className="text-sm text-muted-foreground mt-1">
                This will permanently delete the note and cannot be undone.
              </p>
            </div>
            <div className="flex justify-end space-x-2">
              <button
                className="px-3 py-1 rounded bg-muted text-muted-foreground hover:bg-muted/90"
                onClick={() => setIsDeleteDialogOpen(false)}
              >
                Cancel
              </button>
              <button
                className="px-3 py-1 rounded bg-destructive text-destructive-foreground hover:bg-destructive/90"
                onClick={handleDeleteNote}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
