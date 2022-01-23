import { Module } from "@nestjs/core/injector/module";

export interface IRepository{

   instantiate():Module;
}