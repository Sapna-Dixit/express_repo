import Cookies from 'js-cookie';
import dynamic from 'next/dynamic';
import { Button } from 'react-bootstrap';
import { Editor } from '@tinymce/tinymce-react';
const ReactQuill = dynamic(import('react-quill'), {
  ssr: false,
});
import React, { SetStateAction, useState } from 'react';

import styles from './index.module.css';
import className from 'classnames/bind';

const TextEditor = (props: editorType) => {
  const cx = className.bind(styles);
  const editDescriptionData = Cookies.get(props.cookiesValue as string);

  const [showEditor, setShowEditor] = useState(false);

  const useDarkMode =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-color-scheme: dark)').matches;

  const textEditorOnChange = (e: {
    target: { getContent: () => SetStateAction<string> };
  }) => {
    props.onChange(`${props.name}`, e.target.getContent());
    if (props?.hindi === true) {
      const val = e?.target?.getContent();
      const regex = /<[^>]*>/gim;
      const text = (val as string).replace(regex, '');

      const originalValue = text.replace('&nbsp;', '');
      props.hindiValue && props.hindiValue(originalValue);
    }
  };

  const handleBlur = () => {
    props?.onBlur && props?.onBlur(`${props.name}`, true);
  };

  const textAreaOnChange = (e: SetStateAction<string>) => {
    e === '<p><br></p>'
      ? props?.onChange(`${props?.name}`, '')
      : props?.onChange(`${props?.name}`, e);
    if (props?.hindi === true) {
      const val = e;
      const regex = /<[^>]*>/gim;
      const text = (val as string)?.replace(regex, '');
      const originalValue = text?.replace('&nbsp;', '');
      props.hindiValue && props?.hindiValue(originalValue);
    }
  };
  const modules = {
    toolbar: false,
  };
  return (
    <div>
      {showEditor ? (
        <div>
          <Editor
            apiKey='nqkd2ppm3991i5ahof427m4h5ba9qtk8byerucf8ps8n0xgv'
            initialValue={
              props?.todo === 'edit' ? editDescriptionData : props?.editorValue
            }
            onChange={(e) => textEditorOnChange(e)}
            onBlur={() => handleBlur()}
            init={{
              menubar: 'file edit view insert format tools table help',
              selector: 'textarea#open-source-plugins' as unknown as undefined,
              plugins:
                'print preview paste importcss searchreplace autolink autosave save directionality code visualblocks visualchars fullscreen image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount imagetools textpattern noneditable help charmap quickbars emoticons',
              imagetools_cors_hosts: ['picsum.photos'],
              toolbar:
                'undo redo | bold italic underline strikethrough | fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor backcolor removeformat | pagebreak | charmap emoticons | fullscreen  preview save print | insertfile image media template link anchor codesample | ltr rtl',
              toolbar_sticky: true,
              autosave_ask_before_unload: true,
              autosave_interval: '30s',
              autosave_prefix: '{path}{query}-{id}-',
              autosave_restore_when_empty: false,
              autosave_retention: '2m',
              image_advtab: true,
              templates: [
                {
                  title: 'New Table',
                  description: 'creates a new table',
                  content:
                    '<div class="mceTmpl"><table width="98%%"  border="0" cellspacing="0" cellpadding="0"><tr><th scope="col"> </th><th scope="col"> </th></tr><tr><td> </td><td> </td></tr></table></div>',
                },
                {
                  title: 'Starting my story',
                  description: 'A cure for writers block',
                  content: 'Once upon a time...',
                },
                {
                  title: 'New list with dates',
                  description: 'New List with dates',
                  content:
                    '<div class="mceTmpl"><span class="cdate">cdate</span><br /><span class="mdate">mdate</span><h2>My List</h2><ul><li></li><li></li></ul></div>',
                },
              ],
              template_cdate_format:
                '[Date Created (CDATE): %m/%d/%Y : %H:%M:%S]',
              template_mdate_format:
                '[Date Modified (MDATE): %m/%d/%Y : %H:%M:%S]',
              height: 300,
              image_caption: true,
              quickbars_selection_toolbar:
                'bold italic | quicklink h2 h3 blockquote quickimage quicktable',
              noneditable_noneditable_class: 'mceNonEditable',
              toolbar_mode: 'sliding',
              contextmenu: 'link image imagetools table',
              skin: useDarkMode ? 'oxide-dark' : 'oxide',
              content_css: useDarkMode ? 'dark' : 'default',
              content_style:
                'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
            }}
          />
        </div>
      ) : (
        <>
          <div className='position-relative'>
            <ReactQuill
              modules={modules}
              placeholder={props.placeholder}
              onBlur={() => handleBlur()}
              onChange={(e) => textAreaOnChange(e)}
              defaultValue={
                props.todo === 'create'
                  ? props.editorValue
                  : editDescriptionData
              }
            />
            <div>
              <Button
                title='Open Richtext Editor'
                className={cx('load-upper')}
                onClick={() => setShowEditor(true)}
              >
                <div className={cx('icon-loader')}>
                  <svg
                    width='18'
                    height='18'
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 24 24'
                    fill='#2B2C33'
                  >
                    <path d='M20.063 8.445a3.218 3.218 0 01-.002 4.551l-7.123 7.112a2.25 2.25 0 01-.943.562L7.702 21.96a1 1 0 01-1.24-1.264l1.362-4.228c.11-.34.299-.65.552-.903l7.133-7.121a3.22 3.22 0 014.553.002zm-3.494 1.06l-7.133 7.12a.75.75 0 00-.184.301l-1.07 3.323 3.382-1.015a.75.75 0 00.314-.188L19 11.936a1.718 1.718 0 10-2.431-2.432zM8.15 2.37l.05.105 3.253 8.249-1.157 1.155L9.556 10H5.443l-.995 2.52a.75.75 0 01-.877.454l-.097-.031a.75.75 0 01-.453-.876l.032-.098 3.753-9.495c.236-.595 1.043-.63 1.345-.104zm-.648 2.422L6.036 8.5h2.928L7.503 4.792z'></path>
                  </svg>
                </div>
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default TextEditor;
