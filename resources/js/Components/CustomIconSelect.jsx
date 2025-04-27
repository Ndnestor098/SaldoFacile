import { useState } from 'react';
import { DynamicIcon } from 'lucide-react/dynamic';

export default function CustomIconSelect({ icons, data, setData }) {
    const [open, setOpen] = useState(false);
    const selectedIcon = icons.find((icon) => icon.id === data.icon);

    return (
        <div className="relative">
            <div
                onClick={() => setOpen(!open)}
                className="flex w-full cursor-pointer items-center justify-between rounded-md border border-gray-300 bg-white px-4 py-2 text-quaternary"
            >
                {selectedIcon ? (
                    <div className="flex items-center gap-2">
                        <DynamicIcon
                            name={selectedIcon.name}
                            className="size-4"
                        />
                        <span>{selectedIcon.name}</span>
                    </div>
                ) : (
                    <span>Select Icon</span>
                )}
                <span>▼</span>
            </div>

            {open && (
                <div className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md border border-gray-300 bg-white shadow-md">
                    {icons.map((icon) => (
                        <div
                            key={icon.id}
                            onClick={() => {
                                setData('icon', icon.id);
                                setOpen(false);
                            }}
                            className="flex cursor-pointer items-center gap-2 px-4 py-2 text-black hover:bg-gray-100"
                        >
                            <DynamicIcon name={icon.name} className="size-4" />
                            <span>{icon.name}</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
