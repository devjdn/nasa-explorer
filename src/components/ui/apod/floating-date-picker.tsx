"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { toZonedTime } from "date-fns-tz";
import { ArrowUp, CalendarIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { useRouter } from "next/navigation";

const FormSchema = z.object({
    date: z.date({
        error: "A date after June 16, 1995 is required",
    }),
});

export function DatePickerForm() {
    const router = useRouter();
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
    });

    function onSubmit(data: z.infer<typeof FormSchema>) {
        const bstDate = toZonedTime(data.date, "Europe/London");
        const formattedDate = format(bstDate, "yyyy-MM-dd");
        router.push(`/apod/${formattedDate}`);
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="fixed h-10 bottom-8 left-1/2 transform -translate-x-1/2 z-50 flex items-center gap-2"
            >
                <div className="rounded-full bg-secondary/60 border backdrop-blur-md backdrop-saturate-100 shadow-xl">
                    <FormField
                        control={form.control}
                        name="date"
                        render={({ field }) => (
                            <FormItem>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <FormControl>
                                            <Button
                                                variant={"ghost"}
                                                className={cn(
                                                    "w-[240px] pl-3 text-left font-normal bg-transparent border-none hover:bg-transparent hover:text-current focus:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0",
                                                    !field.value &&
                                                        "text-muted-foreground"
                                                )}
                                            >
                                                {field.value ? (
                                                    format(field.value, "PPP")
                                                ) : (
                                                    <span>Pick a date</span>
                                                )}
                                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                            </Button>
                                        </FormControl>
                                    </PopoverTrigger>
                                    <PopoverContent
                                        className="w-auto p-0"
                                        align="start"
                                    >
                                        <Calendar
                                            mode="single"
                                            selected={field.value}
                                            onSelect={field.onChange}
                                            disabled={(date) =>
                                                date > new Date() ||
                                                date < new Date("1995-06-16")
                                            }
                                            captionLayout="dropdown"
                                        />
                                    </PopoverContent>
                                </Popover>
                            </FormItem>
                        )}
                    />
                </div>

                <Button
                    className="rounded-full bg-secondary/60 border backdrop-blur-md backdrop-saturate-100 h-10 aspect-square shadow-xl"
                    variant={"secondary"}
                    type="submit"
                >
                    <ArrowUp />
                </Button>
            </form>
        </Form>
    );
}
