import {Control, useFieldArray} from "react-hook-form";
import {FormArguments} from "~/routes/characters.new/route";
import {Plus, Trash2} from "lucide-react";

interface PropTypes {
    control: Control<FormArguments>
    register: any
}

export default function SkillsForm({control, register}: PropTypes) {
    const {fields, append, remove} = useFieldArray({control, name: "skills"})

    return (
        <div>
            <div className="font-bold">Skills:</div>
            <button
                type="button"
                onClick={() => append({name: "", value: ""})}
                className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md bg-blue-600 text-white"
            >
                <Plus className="w-4 h-4 mr-2"/>
                Add Skill
            </button>
            {
                fields.map((skill, index) => (
                    <div key={skill.id} className="flex items-start space-x-4">
                        <div className="flex-1">
                            <input
                                {...register(`skills.${index}.name` as const)}
                                placeholder="Skill name (e.g., Cooking)"
                                className="w-full rounded-md border border-gray-300 px-3 py-2"
                            />
                        </div>
                        <div className="flex-1">
                            <input
                                {...register(`skills.${index}.value` as const)}
                                placeholder="Skill value (e.g, 0 or 'very good')"
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