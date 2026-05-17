import fs from 'fs';
import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf.mjs';
import { askAi } from '../service/openRoute.service.js';

export const analyzeResume =async (req, res) => {
    try {
        if(!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }
        const filePath = req.file.path;
        const fileBuffer = await fs.promises.readFile(filePath);
        const unit8Array = new Uint8Array(fileBuffer);


        const pdf =await pdfjsLib.getDocument({data: unit8Array}).promise;
        let resumetext = '';
        for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
            const page = await pdf.getPage(pageNum);
            const content = await page.getTextContent();

            const pageText = content.items.map(item => item.str).join(' ');
            resumetext += pageText + '\n';
        }

        resumetext = resumetext.replace(/\s+/g, ' ').trim();
        const messages = [
            {
                role: 'system',
                content: `Extract structured data from resume.
                Return strictly jSON :

                {
                    role: string,
                    experience: string,
                    projects: [project1, project2,]
                    skills: [skill1, skill2 ]
                }
            }
                `
            },
            {
                role: 'user',
                content: resumetext
            }
        ];

        const aiResponse = await askAi(messages);
        
        // Clean JSON response - remove markdown code block formatting
        let cleanedResponse = aiResponse.trim();
        if (cleanedResponse.startsWith('```')) {
            cleanedResponse = cleanedResponse.replace(/^```(?:json)?\s*/, '').replace(/\s*```$/, '');
        }
        
        const parsed = JSON.parse(cleanedResponse);
        fs.unlinkSync(filePath);
        res.json({
            role: parsed.role || '',
            experience: parsed.experience || '',
            projects: parsed.projects || [],
            skills: parsed.skills || []
        });
    } catch (error) {
        console.error("Resume analysis error:", error.message);
        res.status(500).json({ error: 'Failed to analyze resume' });
    }
}
