import { CollectionReference } from "@google-cloud/firestore";
import { Inject, Injectable } from "@nestjs/common";
import { ICVCommandRepository } from "src/Application/Repositories/CVRepository.repo";
import { Cv, CvState } from "src/Dominio/AggRoots/CV/cv.root";
import { CvCandidate } from "src/Dominio/AggRoots/CV/ValueObjects/cvCandidate.object";
import { CvDescription } from "src/Dominio/AggRoots/CV/ValueObjects/cvDescription.object";
import { CvId } from "src/Dominio/AggRoots/CV/ValueObjects/cvId.object";
import { CvPhoto } from "src/Dominio/AggRoots/CV/ValueObjects/cvPhoto.object";
import { CvStudies } from "src/Dominio/AggRoots/CV/ValueObjects/cvStudies.object";
import { CvWorkExperience } from "src/Dominio/AggRoots/CV/ValueObjects/cvWorkExperience.object";

type studies = {
    description: string
    startDate: string
    finishDate: string
    institution: string
    degree: string 
}

type work = {
    description: string,
    startDate: string,
    finishDate: string,
    job: string
}

type CVEntity = {
    id: string
    candidate: {
        id: string,
        birthdate: string
    }
    description: string
    photo: Buffer
    studies: studies[]
    works: work[]
}

function entityToClass(cvResult: CVEntity) {
    let works : CvWorkExperience[] = [];
    let studies : CvStudies[] = [];
    for (const i of cvResult.works) {
        works.push(new CvWorkExperience(i.description, new Date(i.startDate), new Date(i.finishDate), i.job));
    }
    for (const i of cvResult.studies) {
        studies.push(new CvStudies(i.description, new Date(i.startDate), new Date(i.finishDate), i.institution, i.degree));
    }
    return  Cv.submitCv(
        new CvDescription(cvResult.description),
        works,
        studies,
        new CvPhoto(cvResult.photo),
        new CvCandidate(cvResult.candidate.id, new Date(cvResult.candidate.birthdate)),
        new CvId(cvResult.id),
    );
}

@Injectable()
export class CVFirestoreRepository implements ICVCommandRepository{
    constructor(@Inject('candidates') private repo: CollectionReference<CVEntity>) {}
    
    async save(cv: Cv): Promise<void> {
        let studies : studies[] = [];
        let works : work[] = [];
        for (const i of cv.studies) {
            studies.push({
                description: i.description,
                startDate: i.startDate.toISOString(),
                finishDate: i.finishDate.toISOString(),
                institution: i.institution,
                degree: i.degree 
            });
        }
        for (const i of cv.workExperiences) {
            works.push({
                description: i.description,
                startDate: i.startDate.toISOString(),
                finishDate: i.finishDate.toISOString(),
                job: i.job, 
            });
        }
        let cvSave = await this.repo.doc(cv.id.id).set({
            id: cv.id.id,
            candidate: {
                id: cv.candidate.id,
                birthdate: cv.candidate.birthdate.toISOString()
            },
            description: cv.description.description,
            photo: cv.photo.photo,
            studies: studies,
            works: works,
        })
    }

    async change(id: string, cv: Cv<CvState>): Promise<void> {
        throw new Error("Method not implemented.");
    }

    async getOne(id: string): Promise<Cv<CvState>> {
        const cvQuery = await this.repo.where('id','==',id).get(),
              cvResult = cvQuery.docs[0].data()

        if(!cvResult) return null

        return entityToClass(cvResult)

    }

    async getAll(): Promise<Cv<CvState>[]> {
        /* const cvQuery = await this.repo.get()
        let cvResult: Cv<CvState>[];
        cvQuery.forEach((cv)=>{
            cvResult.push(entityToClass(cv as CVEntity))
        });
        return cvResult */
        throw new Error("Method not implemented.");
    }
}