import { FC, Dispatch, SetStateAction, useState } from 'react';
import { trpc } from '../utils/trpc';
import { items } from '@prisma/client'
interface ItemModalProps {
    setShowModal: Dispatch<SetStateAction<boolean>>
    setItems: Dispatch<SetStateAction<items[]>>

}


export const ItemModal: FC<ItemModalProps> = ({ setShowModal, setItems }) => {
    const [project, setProject] = useState<string>('');
    const [input, setInput] = useState<string>('');
    // Add an onsucess function to the addItems mutation
    const { mutate: addItem } = trpc.items.addItem.useMutation({
        onSuccess: (item) => {
            setItems((prev) => [...prev, item])
        }
    });


    const options = ['Välj vilket projekt', 'Web', 'Admin', 'Kök', 'Servitör', 'Schema', 'DB']
    return (<div className='absolute inset-0 flex items-center justify-center bg-black/75'>
        <div className='p-3 space-y-4 max-w-xl bg-white rounded'>
            <h3 className='text-xl font-medium'>Vad vill du lägga till</h3>
            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className='w-full bg-gray-300 rounded-md border-gray-300 shadow-sm focus:border-violet-400' />
            <select value={project} onChange={(e) => setProject(e.target.value)} className='w-full bg-gray-300 rounded-md border-gray-300 shadow-sm focus:border-violet-400'>
                {options.map((option) => (
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))}
            </select>
            <div className="grid grid-cols-2 gap-8">
                <button type='button' onClick={() => setShowModal(false)} className='bg-violet-600 text-gray-50 rounded p-2'>Avbryt</button>
                <button
                    type='button'
                    onClick={() => {
                        addItem({
                            desc: input,
                            project: project,
                        })
                        setShowModal(false)
                    }}
                    className='bg-violet-600 text-gray-50 rounded p-2 '>Lägg till</button>
            </div>
        </div>
    </div >)
}