import express from 'express';
import {getAcreageService} from '../services/acreage';
export const getAcreageController = async (req,res)=>{
    try {
        const response = await getAcreageService();
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json(error);
    }
};
