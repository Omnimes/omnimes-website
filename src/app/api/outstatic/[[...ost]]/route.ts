// @ts-nocheck

import { OutstaticApi } from "outstatic"

// Rzucamy całą OutstaticApi na `any`, żeby typy GET/POST były też `any`
const anyOutstaticApi: any = OutstaticApi

export const GET = anyOutstaticApi.GET
export const POST = anyOutstaticApi.POST
