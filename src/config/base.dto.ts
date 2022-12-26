import { IsOptional, IsDate, IsUUID  } from "class-validator";

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