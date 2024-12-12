import {LoaderFunctionArgs} from "@remix-run/cloudflare";
import {
    getChatGenerationSettings,
    getChatUiSettings, updateChatGenerationSettings,
    UpdateChatGenerationSettingsParams, updateChatUiSettings, UpdateChatUISettingsBody
} from "~/services/openapi";
import {useLoaderData} from "@remix-run/react";
import {Controller, useForm} from 'react-hook-form';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '~/components/ui/card';
import { Label } from '~/components/ui/label';
import { Input } from '~/components/ui/input';
import { Button } from '~/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '~/components/ui/select';
import { Switch } from '~/components/ui/switch';
import { Slider } from '~/components/ui/slider';
import { Alert, AlertDescription } from '~/components/ui/alert';
import { Separator } from '~/components/ui/separator';
import {Form, FormControl, FormField, FormItem, FormLabel} from '~/components/ui/form'

export async function loader({params}: LoaderFunctionArgs) {
    // Access the $id parameter
    const chatId = params.id;
    if (!chatId) {
        throw new Response("Chat ID is required", {status: 400})
    }

    const chatGenerationSettings = await getChatGenerationSettings({path: {chat_id: chatId}})
    if (!chatGenerationSettings.data) throw new Response("Failed to fetch chat generation settings", {status: 500})

    const chatUISettings = await getChatUiSettings({path: {chat_id: chatId}})
    if (!chatUISettings.data) throw new Response("Failed to fetch chat ui settings", {status: 500})

    return {
        generationSettings: chatGenerationSettings.data,
        uiSettings: chatUISettings.data
    }
}

export interface FormArguments {
    generationSettings: UpdateChatGenerationSettingsParams
    uiSettings: UpdateChatUISettingsBody
}

export default function EditChatSettings() {
    const {generationSettings, uiSettings} = useLoaderData<typeof loader>()
    const { control, handleSubmit, formState: { isSubmitting, isSubmitSuccessful } } = useForm<FormArguments>({
        defaultValues: {
            generationSettings: {
                model_version: generationSettings.model_version,
                chat_prediction_count: generationSettings.chat_prediction_count,
                temperature: generationSettings.temperature,
                top_p: generationSettings.top_p,
                top_k: generationSettings.top_k,
                max_tokens: generationSettings.max_tokens,
                repeat_penalty: generationSettings.repeat_penalty,
            },
            uiSettings: {
                displayStyle: uiSettings.display_style,
                showNames: uiSettings.show_names
            }
        }
    })

    async function onSubmit(data: FormArguments) {
        console.log(data)


        const updateGenerationSettingsResponse = await updateChatGenerationSettings({
            body: data.generationSettings
        })
        if (updateGenerationSettingsResponse.error) throw updateGenerationSettingsResponse.error

        const updateUISettingsResponse = await updateChatUiSettings({
            body: {
                displayStyle: data.uiSettings.displayStyle,
                showNames: data.uiSettings.showNames
            }
        })
        if (updateUISettingsResponse.error) throw updateUISettingsResponse.error
    }

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <Card className="max-w-3xl mx-auto">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold text-gray-900">Chat Settings</CardTitle>
                    <CardDescription>Configure both generation and UI settings for your chat
                        experience</CardDescription>
                </CardHeader>

                <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                        {/* Generation Settings Section */}
                        <div className="space-y-6">
                            <div className="flex items-center justify-between">
                                <h2 className="text-xl font-semibold text-gray-900">Generation Settings</h2>
                            </div>

                            <div className="grid gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="model_version">Model Version</Label>
                                    <Controller
                                        name="generationSettings.model_version"
                                        control={control}
                                        render={({field}) => (
                                            <Input id="model_version" {...field} className="w-full"/>
                                        )}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="prediction_count">Prediction Count</Label>
                                    <Controller
                                        name="generationSettings.chat_prediction_count"
                                        control={control}
                                        render={({field}) => (
                                            <Input
                                                id="prediction_count"
                                                type="number"
                                                {...field}
                                                onChange={(e) => field.onChange(Number(e.target.value))}
                                                placeholder="2"
                                                className="w-full"
                                            />
                                        )}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <div className="flex justify-between items-center">
                                        <Label htmlFor="temperature">Temperature</Label>
                                        <span className="text-sm text-gray-600 font-medium">
                                            <Controller
                                                name="generationSettings.temperature"
                                                control={control}
                                                render={({field: {value}}) => value ?? ""}
                                            />
                                        </span>
                                    </div>
                                    <div className="pt-2">
                                        <Controller
                                            name="generationSettings.temperature"
                                            control={control}
                                            render={({field: {value, onChange}}) => (
                                                <Slider
                                                    id="temperature"
                                                    min={0}
                                                    max={1}
                                                    step={0.1}
                                                    value={[value]}
                                                    onValueChange={(vals) => onChange(vals[0])}
                                                />
                                            )}
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="top_p">Top P</Label>
                                        <Controller
                                            name="generationSettings.top_p"
                                            control={control}
                                            render={({field}) => (
                                                <Input
                                                    id="top_p"
                                                    type="number"
                                                    step="0.1"
                                                    {...field}
                                                    onChange={(e) => field.onChange(Number(e.target.value))}
                                                    placeholder="0.9"
                                                />
                                            )}
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="top_k">Top K</Label>
                                        <Controller
                                            name="generationSettings.top_k"
                                            control={control}
                                            render={({field}) => (
                                                <Input
                                                    id="top_k"
                                                    type="number"
                                                    {...field}
                                                    onChange={(e) => field.onChange(Number(e.target.value))}
                                                    placeholder="50"
                                                />
                                            )}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="max_tokens">Max Tokens</Label>
                                    <Controller
                                        name="generationSettings.max_tokens"
                                        control={control}
                                        render={({field}) => (
                                            <Input
                                                id="max_tokens"
                                                type="number"
                                                {...field}
                                                onChange={(e) => field.onChange(Number(e.target.value))}
                                                placeholder="250"
                                            />
                                        )}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="repeat_penalty">Repetition Penalty</Label>
                                    <Controller
                                        name="generationSettings.repeat_penalty"
                                        control={control}
                                        render={({field}) => (
                                            <Input
                                                id="repeat_penalty"
                                                type="number"
                                                step="0.01"
                                                {...field}
                                                onChange={(e) => field.onChange(Number(e.target.value))}
                                                placeholder="1.15"
                                            />
                                        )}
                                    />
                                </div>
                            </div>
                        </div>

                        <Separator className="my-8"/>

                        {/* UI Settings Section */}
                        <div className="space-y-6">
                            <h2 className="text-xl font-semibold text-gray-900">UI Settings</h2>

                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <Label htmlFor="display_style">Display Style</Label>
                                    <Controller
                                        name="uiSettings.displayStyle"
                                        control={control}
                                        render={({field}) => (
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select display style"/>
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="list">List</SelectItem>
                                                    <SelectItem value="whatsapp">WhatsApp</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        )}
                                    />
                                </div>

                                <div className="flex items-center justify-between">
                                    <Label htmlFor="show_names">Show Names</Label>
                                    <Controller
                                        name="uiSettings.showNames"
                                        control={control}
                                        render={({field}) => (
                                            <Switch
                                                id="show_names"
                                                checked={field.value}
                                                onCheckedChange={field.onChange}
                                            />
                                        )}
                                    />
                                </div>
                            </div>
                        </div>

                        {isSubmitSuccessful && (
                            <Alert className="mt-6">
                                <AlertDescription>
                                    Settings updated successfully! You can now return to the previous page.
                                </AlertDescription>
                            </Alert>
                        )}

                        <div className="flex justify-end pt-6">
                            <Button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full sm:w-auto"
                            >
                                {isSubmitting ? 'Saving changes...' : 'Save Changes'}
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}