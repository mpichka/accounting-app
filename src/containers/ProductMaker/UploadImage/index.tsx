import { DeleteOutlined, EyeOutlined } from '@ant-design/icons';
import { Image as AntdImage, Typography } from 'antd';
import { useEffect, useState } from 'react';
import styles from './styles.module.scss';

const { Text } = Typography;

type Props = {
  image: string | null;
  preview: string | null;
  setImage: (file: string | null) => void;
  setPreview: (file: string | null) => void;
};

export function UploadImage(props: Props) {
  const [image, setImage] = useState<string | null>(props.image);
  const [preview, setPreview] = useState<string | null>(props.preview);

  const handleFileLoad = (e) => {
    const file: File = e.target.files[e.target.files.length - 1];
    if (file) setImageFile(file);
  };

  useEffect(() => {
    if (image && !preview) {
      const img = new Image();
      img.src = 'data:image/jpeg;base64,' + image;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = 200;
        canvas.height = 200;
        const ctx = canvas.getContext('2d');
        if (!ctx) throw new Error('Context is not defined');
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        const ratio = Math.min(
          canvas.width / img.width,
          canvas.height / img.height
        );
        const x = (canvas.width - img.width * ratio) * 0.5;
        const y = (canvas.height - img.height * ratio) * 0.5;
        ctx.drawImage(img, x, y, img.width * ratio, img.height * ratio);

        let quality = 0.9;
        const maxSize = 500 * 1024; // 50kb;

        const resize = () => {
          canvas.toBlob(
            (blob) => {
              if (blob && blob.size && blob.size >= maxSize) {
                quality -= 0.1;
                if (quality <= 0.15) return setPreviewFile(blob);
                resize();
              } else {
                if (blob) return setPreviewFile(blob);
                else throw new Error('Error during preview creation');
              }
            },
            'image/jpeg',
            quality
          );
        };

        resize();
      };
    }

    if ((image && preview) || (!image && !preview)) {
      props.setImage(image);
      props.setPreview(preview);
    }
  }, [image, preview]);

  const setImageFile = (blob: Blob) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.result) {
        const base64url = reader.result
          .toString()
          .replace(/^data:image\/(png|jpeg);base64,/, '');
        setImage(base64url);
      }
    };
    reader.readAsDataURL(blob);
  };

  const setPreviewFile = (blob: Blob) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.result) {
        const base64url = reader.result
          .toString()
          .replace(/^data:image\/(png|jpeg);base64,/, '');
        setPreview(base64url);
      }
    };
    reader.readAsDataURL(blob);
  };

  return (
    <div>
      {preview ? (
        <div className={styles.preview_box}>
          <AntdImage
            width={84}
            height={84}
            className={styles.preview}
            src={'data:image/(png|jpeg);base64,' + preview}
            preview={{
              src: 'data:image/(png|jpeg);base64,' + image,
              mask: (
                <div className={styles.mask_options}>
                  <button className={styles.mask_button}>
                    <EyeOutlined />
                  </button>
                  <button
                    className={styles.mask_button}
                    onClick={() => {
                      setImage(null);
                      setPreview(null);
                    }}
                  >
                    <DeleteOutlined />
                  </button>
                </div>
              ),
            }}
          ></AntdImage>
        </div>
      ) : (
        <label htmlFor="file-input" className={styles.upload}>
          <div>
            <Text>Завантажити зображення</Text>
          </div>
          <input
            id="file-input"
            type="file"
            accept="image/png, image/jpeg"
            onChange={handleFileLoad}
            style={{ display: 'none' }}
          />
        </label>
      )}
    </div>
  );
}
