import express from 'express';
import * as authServices from '../services/auth';

export const Login = async (req,res)=>{
    try {
        const { phone , password } = req.value.body;
        if (!phone || !password) {
            res.status(400).json({
                err: 1,
                message : "Missing attribute"
            });
        };
        const response = await authServices.Login({phone,password});
        if (!response.error) {
            res.setHeader('Authorization',response.access_Token)
        }
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json(error);
    }
};

export const Register = async (req,res)=>{
    try {
        const { name, password, phone } = req.body;
        if (!name || !password || !phone) {
            return res.status(401).json({
                err : 1,
                message : 'Missing attribute'
            }); 
        };
        const response = await authServices.Register({name,password,phone});
        res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({
            err:-1,
            message : 'fail' + error
        });
    }
}