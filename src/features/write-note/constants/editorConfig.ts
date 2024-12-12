import {
  type EditorConfig,
  Autoformat,
  AutoLink,
  BlockQuote,
  HorizontalLine,
  Bold,
  Code,
  CodeBlock,
  Essentials,
  Italic,
  Link,
  Image,
  ImageInsert,
  List,
  ListProperties,
  Markdown,
  Paragraph,
  TextTransformation,
  Title,
  TodoList,
} from 'ckeditor5'
import translation from 'ckeditor5/translations/ko.js'

const EDITOR_CONFIG: EditorConfig = {
  licenseKey: 'GPL',
  plugins: [
    AutoLink,
    Autoformat,
    BlockQuote,
    HorizontalLine,
    Bold,
    Code,
    CodeBlock,
    Essentials,
    Italic,
    Link,
    Image,
    ImageInsert,
    List,
    ListProperties,
    Markdown,
    Paragraph,
    TextTransformation,
    Title,
    TodoList,
  ],
  language: 'ko',
  toolbar: {
    items: [
      'bold',
      'italic',
      'code',
      '|',
      'blockQuote',
      'horizontalLine',
      '|',
      'link',
      'insertImage',
      '|',
      'numberedList',
      'bulletedList',
      'todoList',
    ],
  },
  list: {
    properties: { styles: false },
  },
  codeBlock: {
    languages: [{ language: 'plaintext', label: '' }],
  },
  image: {
    insert: {
      integrations: ['url'],
    },
  },
  placeholder: ' ',
  title: {
    placeholder: '내용을 입력해주세요',
  },
  translations: [translation],
}

export default EDITOR_CONFIG