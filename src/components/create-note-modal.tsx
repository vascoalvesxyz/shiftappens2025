"use client"

import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import MDXRender from "@/components/MDXRender"

// Define the form schema
const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  type: z.enum(["document", "image", "code", "spreadsheet", "chart", "audio", "video"], {
    errorMap: () => ({ message: "Type is required" }),
  }),
  content: z.string().min(1, "Content is required"),
})

type NoteFormValues = z.infer<typeof formSchema>

export function CreateNoteModal({ drawer, onNoteCreated }: { drawer: number, onNoteCreated?: (note: Note) => void }) {
  const [open, setOpen] = useState(false)
  const [noteId, setNoteId] = useState<number>(1)


  // Initialize form with react-hook-form
  const form = useForm<NoteFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      type: "document",
      content: "",
    },
  })

  useEffect(() => {
    for (let i = 1; i <= localStorage.length*2; i++) {
      if (!localStorage.getItem(`${drawer} ${i}`)) {
        setNoteId(i)
        break
      }
    }
  }, [])

  // Handle form submission
  function onSubmit(values: NoteFormValues) {
    if (localStorage.getItem(`${drawer} ${noteId}`)) {
      return
    }
    const note: Note = {
      drawer,
      id: noteId,
      type: values.type,
      title: values.title,
      content: values.content,
    }
    // Save to localStorage with a unique key
    localStorage.setItem(`${note.drawer} ${note.id}`, `${note.type}|${note.title}|${note.content}`)
    onNoteCreated?.(note)

    // Reset form and close modal
    form.reset()
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Create Note
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[900px] max-h-[80vh]">
        <DialogHeader>
          <DialogTitle>Create New Note</DialogTitle>
          <DialogDescription>Create a new note with MDX support. Click save when you're done.</DialogDescription>
        </DialogHeader>
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

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <FormField
                  control={form.control}
                  name="content"
                  render={({ field }) => (
                    <FormItem>
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
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Preview</span>
                </div>
                <div className="rounded-md border border-input p-4 min-h-[350px] overflow-auto max-h-[500px]">
                  {form.watch("content").trim() ? (
                    <MDXRender mdxString={form.watch("content")} />
                  ) : (
                    <p className="text-muted-foreground italic">Nothing to preview…</p>
                  )}
                </div>
              </div>
            </div>

            <DialogFooter>
              <Button type="submit">Save Note</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
