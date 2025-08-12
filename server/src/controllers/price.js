import express from 'express';
import {getPricesService} from '../services/price';

export const getPriceController = async (req,res)=>{
    try {
        const response = await getPricesService();
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json(error);
    }
};
