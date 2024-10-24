import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class FileService {
    async deleteFile(filename: string): Promise<any> {
        const filePath = path.join(__dirname, '../../..', filename);
        console.log(filePath);
        fs.unlink(filePath, (err) => {
            if (err) {
                console.error(`Ошибка при удалении файла: ${err}`);
            } else {
                console.log(`Файл ${filename} успешно удален`);
            }
        });
    }
}