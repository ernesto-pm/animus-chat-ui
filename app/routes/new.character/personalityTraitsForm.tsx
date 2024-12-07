import {Control, useFieldArray} from "react-hook-form";
import {FormArguments} from "~/routes/new.character/route";
import {Plus, Trash2} from "lucide-react";

interface PropTypes {
    control: Control<FormArguments>
    register: any
}

export default function PersonalityTraitsForm({control, register}: PropTypes) {
    const {fields, append, remove} = useFieldArray({control, name: "personalityTraits"})

    return (
        <div>
            <div className="font-bold">Personality traits:</div>
            <button
                type="button"
                onClick={() => append({name: "", value: ""})}
                className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md bg-blue-600 text-white"
            >
                <Plus className="w-4 h-4 mr-2"/>
                Add Trait
            </button>
            {
                fields.map((personalityTrait, index) => (
                    <div key={personalityTrait.id} className="flex items-start space-x-4">
                        <div className="flex-1">
                            <input
                                {...register(`personalityTraits.${index}.name` as const)}
                                placeholder="Trait name (e.g., Explicit Fears)"
                                className="w-full rounded-md border border-gray-300 px-3 py-2"
                            />
                        </div>
                        <div className="flex-1">
                            <input
                                {...register(`personalityTraits.${index}.value` as const)}
                                placeholder="Trait value"
                                className="w-full rounded-md border border-gray-300 px-3 py-2"
                            />
                        </div>
                        <button
                            type="button"
                            onClick={() => remove(index)}
                            className="p-2 text-red-500 hover:text-red-700"
                        >
                            <Trash2 className="w-5 h-5"/>
                        </button>
                    </div>
                ))
            }
        </div>
    )
}