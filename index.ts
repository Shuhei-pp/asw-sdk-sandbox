import { ListObjectsV2Command, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

const client = new S3Client({ region: 'ap-northeast-1' });

const bucketName = '';
const directoryPrefix = ''; // ディレクトリパス（末尾に `/` を含める）
const params = {
    Bucket: bucketName,
    Prefix: directoryPrefix, // 指定したディレクトリ内のみ
    Delimiter: '/', // フォルダを区切るための区切り文字
  };

  const command = new ListObjectsV2Command(params);
  const response = await client.send(command);

  // サブフォルダの取得
  const folders = response.CommonPrefixes?.map((prefix) => prefix.Prefix) || [];
  console.log('Folders:', folders);

  // ファイルの取得
  const files = response.Contents?.map((content) => content.Key) || [];
  console.log('Files:', files);

const putObj = async (key: string, body: string) => {
    const params = {
        Bucket: bucketName,
        Key: key,
        Body: body,
    };
    const command = new PutObjectCommand(params);
    await client.send(command);
    }

    putObj('test.txt', 'test');
