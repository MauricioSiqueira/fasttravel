import { PartialType } from "@nestjs/mapped-types";
import { CreateTravelDTO } from "./create-travel.dto";

export class UpdateTravelDTO extends PartialType( CreateTravelDTO ) {}