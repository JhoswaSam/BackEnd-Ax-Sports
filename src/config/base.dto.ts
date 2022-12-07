import { IsOptional } from "class-validator";
import { IsDate, IsUUID } from "class-validator/types/decorator/decorators";

export class DTOBase{

    @IsUUID()
    @IsOptional()
    id!:string;

    @IsDate()
    @IsOptional()
    createdAd!: Date;

    @IsDate()
    @IsOptional()
    updateAd!: Date;
}