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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import '../style/desktop.css'

const formSchema = z.object({
    title: z.string().min(1, "Title is required"),
    type: z.enum(["document", "image", "code", "spreadsheet", "chart", "audio", "video"], {
        errorMap: () => ({ message: "Type is required" }),
    }),
    content: z.string().min(1, "Content is required"),
})

type NoteFormValues = z.infer<typeof formSchema>
type Note = {
    drawer: number
    id: number
    type: string
    title: string
    content: string
}

export function CreateNoteModal({ drawer, onNoteCreated }: { drawer: number, onNoteCreated?: (note: Note) => void }) {
    const [open, setOpen] = useState(false)
    const [noteId, setNoteId] = useState<number>(1)

    const form = useForm<NoteFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            type: "document",
            content: "",
        },
    })

    function fetchNewNoteId() {
        for (let i = 1; i <= localStorage.length * 2; i++) {
            if (!localStorage.getItem(`${drawer} ${i}`)) {
                setNoteId(i)
                break
            }
        }
        console.log("Note ID:", noteId)
    }

    useEffect(() => {
        fetchNewNoteId()
    }, [])

    function onSubmit(values: NoteFormValues) {
        if (localStorage.getItem(`${drawer} ${noteId}`)) return

        const note: Note = {
            drawer,
            id: noteId,
            type: values.type,
            title: values.title,
            content: values.content,
        }

        localStorage.setItem(`${note.drawer} ${note.id}`, `${note.type}|${note.title}|${note.content}`)
        onNoteCreated?.(note)

        form.reset()
        setOpen(false)

        fetchNewNoteId()
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="gap-2">
                    <Plus className="h-4 w-4" /> Create Note </Button>
            </DialogTrigger>
            <DialogContent className="w-[95vw] h-[90vh] sm:max-w-[95vw] max-w-none p-6 overflow-hidden">
                <div className="card-container-scroll flex flex-col h-full">
                    <DialogHeader>

                        <DialogTitle>Create New Note</DialogTitle>
                        <DialogDescription>Create a new note with MDX support. Click save when you're done.</DialogDescription>
                    </DialogHeader>

                    <div className="flex-1 overflow-y-auto py-4">
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 h-full flex flex-col">
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

                                {/* Responsive Tabs for mobile */}
                                <div className="block sm:hidden">
                                    <Tabs defaultValue="content">
                                        <TabsList className="grid w-full grid-cols-2 mb-2">
                                            <TabsTrigger value="content">Content</TabsTrigger>
                                            <TabsTrigger value="preview">Preview</TabsTrigger>
                                        </TabsList>
                                        <TabsContent value="content">
                                            <FormField
                                                control={form.control}
                                                name="content"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Content</FormLabel>
                                                        <FormControl>
                                                            <Textarea
                                                                placeholder="Write your note content..."
                                                                className="h-[40vh] resize-none font-mono"
                                                                {...field}
                                                            />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </TabsContent>
                                        <TabsContent value="preview">
                                            <FormLabel>Preview</FormLabel>
                                            <div className="rounded-md border border-input mt-2 pl-4 h-[40vh] overflow-auto max-w-full">
                                                {form.watch("content").trim() ? (
                                                    <MDXRender mdxString={form.watch("content")} />
                                                ) : (
                                                        <p className="text-muted-foreground italic">Nothing to preview…</p>
                                                    )}
                                            </div>
                                        </TabsContent>
                                    </Tabs>
                                </div>

                                {/* Desktop side-by-side layout */}
                                <div className="hidden sm:grid sm:grid-cols-2 sm:gap-4 flex-1">
                                    <div className="space-y-2 h-full flex flex-col">
                                        <FormField
                                            control={form.control}
                                            name="content"
                                            render={({ field }) => (
                                                <FormItem className="flex-1 flex flex-col">
                                                    <FormLabel>Content</FormLabel>
                                                    <FormControl className="flex-1">
                                                        <Textarea
                                                            placeholder="Write your note content..."
                                                            className="flex-1 resize-none font-mono"
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <div className="space-y-2 h-full flex flex-col">
                                        <FormLabel>Preview</FormLabel>
                                        <div className="create-note-text-preview rounded-md border border-input p-4 flex-1 overflow-auto">
                                            {form.watch("content").trim() ? (
                                                <MDXRender mdxString={form.watch("content")} />
                                            ) : (
                                                    <p className="text-muted-foreground italic">Nothing to preview…</p>
                                                )}
                                        </div>
                                    </div>
                                </div>

                            </form>
                        </Form>
                    </div>
                    <div className="card-save pt-4">
                        <DialogFooter>
                            <Button type="submit">Save Note</Button>
                        </DialogFooter>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}
