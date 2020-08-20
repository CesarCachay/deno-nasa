import { Router } from "./deps.ts";

import * as planets from "./models/planets.ts";
import * as launches from "./models/launches.ts";

const router = new Router();

router.get("/", (ctx) => {
  ctx.response.body = `
  {___     {__      {_         {__ __        {_       
    {_ {__   {__     {_ __     {__    {__     {_ __     
    {__ {__  {__    {_  {__     {__          {_  {__    
    {__  {__ {__   {__   {__      {__       {__   {__   
    {__   {_ {__  {______ {__        {__   {______ {__  
    {__    {_ __ {__       {__ {__    {__ {__       {__ 
    {__      {__{__         {__  {__ __  {__         {__
                    Mission Control API`;
});

router.get("/planets", (ctx) => {
  // The following 3 lines are to try the event handlers
  // throw new Error("Sample error");
  // ctx.throw(501, "There are not planets now"); //This won't show the custom message because is server error
  // ctx.throw(400, "Sorry planets are not available now"); //This one will show the custom message because is client error
  ctx.response.body = planets.getAllPlanets();
});

router.get("/launches", (ctx) => {
  ctx.response.body = launches.getAllLaunches();
});

router.get("/launches/:id", (ctx) => {
  // This ctx.params? is to make sure that in the ctx there are params
  if (ctx.params?.id) {
    const launchesList = ctx.response.body = launches.getSingleLaunch(
      Number(ctx.params.id),
    );
    // To make sure that if the API return null value defined previously
    if (launchesList) {
      ctx.response.body = launchesList;
    } else {
      ctx.throw(400, "Launch with that ID doesn't exist");
    }
  }
  // The long way of ctx.params?
  // if(ctx.params && ctx.params.id){...}
});

router.post("/launches", async (ctx) => {
  const body = await ctx.request.body();

  launches.createLaunch(body.value);

  ctx.response.body = { success: true };
  ctx.response.status = 201;
});

router.delete("/launches/:id", (ctx) => {
  if (ctx.params?.id) {
    const result = launches.deleteLaunch(Number(ctx.params.id));
    ctx.response.body = { success: result };
  }
});

export default router;
