'use client'

import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Edit, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import MDXRender from "@/components/MDXRender"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { getNoteIcon, Note, NoteType, noteTypes } from "@/lib/types"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  type: z.enum(["red", "blue", "green", "yellow", "purple", "orange"], {
    errorMap: () => ({ message: "Type is required" }),
  }),
  content: z.string().min(1, "Content is required"),
})

type NoteFormValues = z.infer<typeof formSchema>

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
  noteType,
  noteTitle,
  isOpen,
  onOpenChange,
  onNoteDeleted,
  onNoteUpdated,
}: NoteViewerProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [note, setNote] = useState<Note | null>(null)
  const [activeTab, setActiveTab] = useState<"content" | "preview">("content")

  const form = useForm<NoteFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      type: "red",
      content: "",
    },
  })

  useEffect(() => {
    const stored = localStorage.getItem(`${drawer} ${noteId}`)
    if (stored) {
      const [type, title, content] = stored.split("|")
      const newNote: Note = {
        drawer,
        id: noteId,
        type: type as NoteType,
        title,
        content: content || "",
      }
      setNote(newNote)
      form.reset({
        title,
        type: type as NoteType,
        content: content || "",
      })
    }
  }, [drawer, noteId, isOpen])

  function onSubmit(values: NoteFormValues) {
    if (!note) return

    // Update the note type, title, and content in localStorage
    const newKey = `${drawer} ${noteId}`
    const newValue = `${values.type}|${values.title}|${values.content}`

    if (values.title !== note.title || values.type !== note.type) {
      localStorage.removeItem(newKey)
    }

    localStorage.setItem(newKey, newValue)

    setIsEditing(false)
    setNote({ ...note, title: values.title, type: values.type, content: values.content })
    onNoteUpdated?.()

    if (values.title !== note.title) {
      onOpenChange(false)
    }
  }

  function handleDeleteNote() {
    localStorage.removeItem(`${drawer} ${noteId}`)
    setIsDeleteDialogOpen(false)
    onOpenChange(false)
    onNoteDeleted?.()
  }

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onOpenChange}>
        <DialogContent className="glass w-[95vw] h-[90vh] sm:max-w-[95vw] max-w-none p-6 overflow-hidden">
          {!isEditing && note ? (
            <>
            <div className="card-container-scroll flex flex-col h-full">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  {getNoteIcon(note.type)}
                  {note?.title}
                </DialogTitle>
                <DialogDescription className="flex gap-2 mt-2 justify-between">
                  <Button variant="outline" size="sm" onClick={() => setIsEditing(true)} className="gap-1">
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
                </DialogDescription>
              </DialogHeader>
              <div className="overflow-auto max-h-[500px]">
                {note?.content ? (
                  <MDXRender mdxString={note.content} />
                ) : (
                  <p className="italic text-muted-foreground">No content found.</p>
                )}
              </div>
            </div>
            </>
          ) : (
            <>
              <div className="card-header">
                <DialogTitle>Edit Note</DialogTitle>
                <DialogDescription>Make changes to your note. Click save when you're done.</DialogDescription>
              </div>
              <div className="card-container-scroll flex flex-col h-full">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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

                  <FormField
                    control={form.control}
                    name="type"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Note Color</FormLabel>
                        <Select value={field.value} onValueChange={field.onChange}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {noteTypes.map(({ value, label, icon }) => (
                              <SelectItem key={value} value={value}>
                                <div className="flex items-center">
                                  {icon}
                                  {label}
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Mobile Tab Layout */}
                  <div className="block sm:hidden">
                    <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as "content" | "preview")}> 
                      <TabsList className="w-full mb-2">
                        <TabsTrigger value="content" className="w-full">Editor</TabsTrigger>
                        <TabsTrigger value="preview" className="w-full">Preview</TabsTrigger>
                      </TabsList>
                      <TabsContent value="content">
                        <FormField
                          control={form.control}
                          name="content"
                          render={({ field }) => (
                            <FormItem className="space-y-2">
                              <FormLabel>Content</FormLabel>
                              <FormControl>
                                <Textarea
                                  placeholder="Write your note content..."
                                  className="min-h-[40%] max-h-full resize-none font-mono"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </TabsContent>
                      <TabsContent value="preview">
                        <div className="space-y-2">
                          <span className="text-sm font-medium">Preview</span>
                          <div className="create-note-text-preview rounded-md border border-input p-2 min-h-[350px] overflow-auto max-h-full">
                            {form.watch("content").trim() ? (
                              <MDXRender mdxString={form.watch("content")} />
                            ) : (
                              <p className="text-muted-foreground italic">Nothing to preview…</p>
                            )}
                          </div>
                        </div>
                      </TabsContent>
                    </Tabs>
                  </div>

                  {/* Desktop Grid Layout */}
                  <div className="hidden sm:grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="content"
                      render={({ field }) => (
                        <FormItem className="space-y-2">
                          <FormLabel>Content</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Write your note content..."
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
                      <div className="create-note-text-preview rounded-md border mt-1 border-input pl-4 min-h-[350px] overflow-auto max-h-[500px]">
                        {form.watch("content").trim() ? (
                          <MDXRender mdxString={form.watch("content")} />
                        ) : (
                          <p className="text-muted-foreground italic">Nothing to preview…</p>
                        )}
                      </div>
                    </div>
                  </div>

                  <DialogFooter>
                    <Button type="button" variant="outline" onClick={() => setIsEditing(false)}>
                      Cancel
                    </Button>
                    <Button type="submit">Save Changes</Button>
                  </DialogFooter>
                </form>
              </Form>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the note and cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteNote}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
