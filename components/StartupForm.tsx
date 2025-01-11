'use client';

import { Input } from '@/components/ui/input';
import {useActionState, useState} from "react";
import {Textarea} from "@/components/ui/textarea";
import MDEditor from '@uiw/react-md-editor';
import {Button} from "@/components/ui/button";
import {Send} from "lucide-react";
import {formSchema} from "@/sanity/lib/validation";
import {ZodError} from "zod";
import {useToast} from "@/hooks/use-toast";
import {useRouter} from "next/navigation";
import {createPitch} from "@/sanity/lib/actions";


const StartupForm = () => {
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [pitch, setPitch] = useState("");
    const {toast} = useToast();
    const router = useRouter();


    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const handleFormSubmit = async (prevState, e: FormData) => {

        try {
         const formValues = {
             title: e.get("title"),
             category: e.get("category"),
             description: e.get("description"),
             link: e.get("link"),
             pitch
         }
         setErrors({});

         await formSchema.parseAsync(formValues);
         console.log(formValues);

         const result = await createPitch(prevState, e, pitch);

         toast({
             title: "Success",
             description: "Your startup has been created successfully",
         })

            router.push(`/startup/${result._id}`)

       } catch (err: unknown) {
           if (err instanceof ZodError) {
               const fieldErrors = err.flatten().fieldErrors;
               setErrors(fieldErrors as unknown as Record<string, string>);

               toast({
                   title: "Error",
                   description: "Please check your input",
                   variant: "destructive"
               })

               return {...prevState, error: "Validation failed", status: "ERROR"};
          }

            toast({
                title: "Error",
                description: "An unexpected error occurred",
                variant: "destructive"
            })

           return {
               ...prevState,
                  error: "An unexpected error occurred.",
                  status: "ERROR",
              }
       }
    }

    const [, dispatch, isPending] = useActionState(handleFormSubmit, {
        error: "",
        status: "INITIAL",
    });


    return (
        <form action={dispatch} className="startup-form">
            <div>
                <label htmlFor="title" className="startup-form_label">
                    Title
                </label>

                <Input id="title"
                       className="startup-form_input"
                       placeholder="Startup Title"
                       name="title"
                       required
                />

                {errors.title && <p className="startup-form_error">{errors.title}</p>}

            </div>

            <div>
                <label htmlFor="description" className="startup-form_label">
                    Description
                </label>

                <Textarea
                    id="description"
                    className="startup-form_textarea"
                    placeholder="Startup Description"
                    name="description"
                    required
                />

                {errors.description && <p className="startup-form_error">{errors.description}</p>}

            </div>

            <div>
                <label htmlFor="category" className="startup-form_label">
                    Category
                </label>

                <Input id="category"
                       className="startup-form_input"
                       placeholder="Startup Category(Tech, Health, Education...)"
                       name="category"
                       required
                />

                {errors.category && <p className="startup-form_error">{errors.category}</p>}

            </div>


            <div>
                <label htmlFor="link" className="startup-form_label">
                    Image URL
                </label>

                <Input id="link"
                       className="startup-form_input"
                       name="link"
                       placeholder="Startup Image URL"
                       required
                />

                {errors.link && <p className="startup-form_error">{errors.link}</p>}

            </div>


            <div data-color-mode="light">

                <label htmlFor="pitch" className="startup-form_label">
                    Pitch
                </label>

                <MDEditor
                    value={pitch}
                    onChange={(value) => setPitch(value as string)}
                    id="pitch"
                    preview="edit"
                    height={350}
                    style={{borderRadius: 20, overflow: 'hidden'}}
                    textareaProps={
                        {
                            placeholder: "Briefly describe your idea and what problem it solves!"
                        }
                    }
                    previewOptions={{
                        disallowedElements: ['style']
                    }}
                />

                {errors.pitch && <p className="startup-form_error">{errors.pitch}</p>}

            </div>

            <Button type="submit" className="startup-form_btn" disabled={isPending}>
                {isPending ? "Submitting..." : "Submit your startup"}
                <Send className="size-10 ml-2"/>
            </Button>

        </form>
    )
}
export default StartupForm
