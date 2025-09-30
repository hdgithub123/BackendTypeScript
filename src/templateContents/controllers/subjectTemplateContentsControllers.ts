import { Request, Response } from "express";
//import {getRight,getRights,insertRight,insertRights,updateRight,updateRights} from "../models/rightModels";
import * as templateContentModel from "../models/subjectTemplateContentsModels";


export function getSubjectTemplateContent(scopeName: string) {
    return async function (req: Request, res: Response) {
        try {
            const id: string = req.params.id;
            const organizationId = req.user.organizationId;

            const { data, status, errorCode } = await templateContentModel.getSubjectTemplateContent(id, organizationId, scopeName);

            if (status && Array.isArray(data) && data.length > 0) {
                res.status(200).json({ data, status, errorCode });
            } else {
                res.status(404).json({ data, status, errorCode });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ status: false, message: 'Internal Server Error' });
        }
    };
}

export function getSubjectTemplateContents(scopeName: string) {
    return async function (req: Request, res: Response) {
        try {
            const organizationId = req.user.organizationId;

            const { data, status, errorCode } = await templateContentModel.getSubjectTemplateContents(organizationId, scopeName);

            if (status && Array.isArray(data) && data.length > 0) {
                res.status(200).json({ data, status, errorCode });
            } else {
                res.status(404).json({ data, status, errorCode });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ status: false, message: 'Internal Server Error' });
        }
    };
}


export function insertSubjectTemplateContent(scopeName: string) {
    return async function (req: Request, res: Response, next: Function) {
        try {
            const templateContent = req.body;

            if (req.user?.code) {
                templateContent.createdBy = req.user.code;
                templateContent.updatedBy = req.user.code;
            }

            if (req.user?.organizationId) {
                templateContent.organizationId = req.user.organizationId;
            }

            templateContent.scopeName = scopeName;

            const { data, status, errorCode } = await templateContentModel.insertSubjectTemplateContent(templateContent);

            if (status) {
                req.result = data;
                res.status(201).json({ data, status, errorCode });
                next();
            } else {
                res.status(400).json({ data, status, errorCode });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ status: false, message: 'Internal Server Error' });
        }
    };
}




export function updateSubjectTemplateContent(scopeName: string) {
    return async function (req: Request, res: Response, next: Function) {
        try {
            const templateContent = req.body;
            templateContent.id = req.params.id;

            if (req.user?.organizationId) {
                templateContent.organizationId = req.user.organizationId;
            }

            templateContent.scopeName = scopeName;

            const { data, status, errorCode } = await templateContentModel.updateSubjectTemplateContent(templateContent);

            if (status) {
                req.result = data;
                res.status(200).json({ data, status, errorCode });
                next();
            } else {
                res.status(400).json({ data, status, errorCode });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ status: false, message: 'Internal Server Error' });
        }
    };
}





export function deleteSubjectTemplateContent(scopeName: string) {
    return async function (req: Request, res: Response, next: Function) {
        try {
            const templateContent = {
                id: req.params.id,
                organizationId: req.user?.organizationId,
                scopeName: scopeName
            };

            const { data, status, errorCode } = await templateContentModel.deleteSubjectTemplateContent(templateContent);

            if (status) {
                req.result = data;
                res.status(204).json({ data, status, errorCode });
                next();
            } else {
                res.status(400).json({ data, status, errorCode });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ status: false, message: 'Internal Server Error' });
        }
    };
}

