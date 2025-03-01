import * as React from 'react'
import { Check, ChevronsUpDown } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Button } from '@/Components/ui/button'
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from '@/Components/ui/command'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/Components/ui/popover'
import { monthNames } from '@/utils'

type Props = {
    hide: boolean
    value: string | null
    onChange: (value: string) => void
}

const SelectDateMonth: React.FC<Props> = ({
    hide = false,
    value,
    onChange,
}) => {
    const [open, setOpen] = React.useState(false)
    const currentDate = new Date()
    const currentYear = currentDate.getFullYear()
    const currentMonth = currentDate.getMonth() + 1
    const startYear = currentYear - 5

    const generateMonthYearOptions = () => {
        const options: { value: string; label: string }[] = []
        for (let year = currentYear; year >= startYear; year--) {
            for (let month = 12; month >= 1; month--) {
                if (year === currentYear && month > currentMonth) continue
                const formattedMonth = month.toString().padStart(2, '0')
                const label = `${year} ${monthNames[month - 1]}`
                options.push({ value: `${year}-${formattedMonth}`, label })
            }
        }
        return options
    }
    const options = generateMonthYearOptions()
    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className={`w-full justify-between ${hide ? 'hidden md:flex' : ''}`}
                >
                    {value
                        ? options.find((opt) => opt.value === value)?.label
                        : 'Pilih tahun bulan'}
                    <ChevronsUpDown className="opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="p-0 w-[--radix-popover-trigger-width]">
                <Command className="w-full">
                    <CommandInput
                        placeholder="Cari tahun bulan"
                        className="h-9"
                    />
                    <CommandList>
                        <CommandEmpty>Data tidak ditemukan.</CommandEmpty>
                        <CommandGroup>
                            {options.map((option) => (
                                <CommandItem
                                    key={option.value}
                                    value={option.label}
                                    onSelect={() => {
                                        onChange(option.value)
                                        setOpen(false)
                                    }}
                                >
                                    {option.label}
                                    <Check
                                        className={cn(
                                            'ml-auto',
                                            value === option.value
                                                ? 'opacity-100'
                                                : 'opacity-0'
                                        )}
                                    />
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}
export default SelectDateMonth
