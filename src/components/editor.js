import React, { PureComponent } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

/**
 * https://quilljs.com/docs/formats
 * Quill supports a number of formats, both in UI controls and API calls
 */

const modules = {
  toolbar: [
    [{ 'header': [1, 2, false] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
    ['link', 'image', 'video'],
    ['clean']
  ]
}

const formats = [
  'header',
  'bold', 'italic', 'underline', 'strike', 'blockquote',
  'list', 'bullet', 'indent',
  'link', 'image', 'video'
]

class Editor extends PureComponent {
  render() {
    const { content, handleContent } = this.props
    return (
      <ReactQuill
        theme="snow"
        value={content}
        modules={modules}
        formats={formats}
        onChange={handleContent}
      />
    )
  }
}

export default Editor
