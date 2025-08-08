import { DatePickerForm } from "@/components/ui/apod/floating-date-picker";

export default function APODLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <main>
            {children}
            <DatePickerForm />
        </main>
    );
}
