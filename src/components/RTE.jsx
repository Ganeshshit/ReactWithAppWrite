import React from 'react'
import { Editor } from '@tinymce/tinymce-react'
import { Controller } from 'react-hook-form'
const RTE = ({name,control,label, defaultValue=""}) => {
  return (
    <div className=' w-full '>R
    {label&& <label className=' inline-block mb-1 pl-1'>{label}</label>}
    <Controller
    name={name||"content"}
    control={control}
    render={({field:{onChange}})=>(
        <Editor
        initialValue={defaultValue}
        init={{height:500,
        menubar:true,
    plugins:[''],//!Pickup from documentation
    toolbar:[]
    }}
    onEditorChange={onChange}
        />
    )}
    />


    TE</div>
  )
}

export default RTE