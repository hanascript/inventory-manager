'use client';

import { Toggle } from '@/components/ui/toggle';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { BoldIcon, ItalicIcon, ListIcon, ListOrderedIcon, StrikethroughIcon } from 'lucide-react';
import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { Placeholder } from '@tiptap/extension-placeholder';

export const Tiptap = ({ value, disabled }: { value: string; disabled: boolean }) => {
  const { setValue } = useFormContext();
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        orderedList: {
          HTMLAttributes: {
            class: 'list-decimal pl-4',
          },
        },

        bulletList: {
          HTMLAttributes: {
            class: 'list-disc pl-4',
          },
        },
      }),
    ],

    onUpdate: ({ editor }) => {
      // This could be injected with javascript, if this was public you would need to sanitize the input
      const content = editor.getHTML();
      setValue('description', content, {
        // Validates the input, I guess for the types of data
        shouldValidate: true,
        // This shows if the input is dirty, if it is it will show the save button
        shouldDirty: true,
      });
    },
    editorProps: {
      attributes: {
        class:
          'min-h-[128px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
      },
    },
    content: value,
    immediatelyRender: false,
  });

  // This is to sync if the product is in edit mode
  useEffect(() => {
    if (editor?.isEmpty) editor.commands.setContent(value);
  }, [value]);

  return (
    <div className='flex flex-col gap-2'>
      {editor && (
        <div className='border-input border rounded-md'>
          <Toggle
            pressed={editor.isActive('bold')}
            // brings focus to the editor and toggles bold
            // inside chain and run, view docs
            onPressedChange={() => editor.chain().focus().toggleBold().run()}
            size={'sm'}
          >
            <BoldIcon className='size-4' />
          </Toggle>
          <Toggle
            pressed={editor.isActive('italic')}
            onPressedChange={() => editor.chain().focus().toggleItalic().run()}
            size={'sm'}
          >
            <ItalicIcon className='size-4' />
          </Toggle>
          <Toggle
            pressed={editor.isActive('strike')}
            onPressedChange={() => editor.chain().focus().toggleStrike().run()}
            size={'sm'}
          >
            <StrikethroughIcon className='size-4' />
          </Toggle>
          <Toggle
            pressed={editor.isActive('orderedList')}
            onPressedChange={() => editor.chain().focus().toggleOrderedList().run()}
            size={'sm'}
          >
            <ListOrderedIcon className='size-4' />
          </Toggle>
          <Toggle
            pressed={editor.isActive('bulletList')}
            onPressedChange={() => editor.chain().focus().toggleBulletList().run()}
            size={'sm'}
          >
            <ListIcon className='size-4' />
          </Toggle>
        </div>
      )}
      <EditorContent
        placeholder='Product Description'
        editor={editor}
        disabled={disabled}
      />
    </div>
  );
};
