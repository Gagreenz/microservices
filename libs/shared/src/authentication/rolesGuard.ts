import { CanActivate, ExecutionContext, Inject, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable, of, switchMap } from "rxjs";
import { Role } from "./role";
import { ClientProxy } from "@nestjs/microservices";

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(
        private readonly reflector: Reflector,
        @Inject('AUTH_SERVICE') private readonly authService: ClientProxy,
    ) {}

    async canActivate(context: ExecutionContext) {
        const requiredRoles = this.reflector.getAllAndOverride<Role[]>('roles',[
            context.getHandler(),
            context.getClass(),
        ]);
        if(!requiredRoles){
            return true;
        }
        
        const request = context.switchToHttp().getRequest();
        const authHeader = request.headers['authorization'];
        if(!authHeader) return false;

        const authHeaderParts = (authHeader as string).split(' ');
        if(authHeaderParts.length != 2) return false;

        const [, jwt] = authHeaderParts;

        const { user } = await this.authService.send({ cmd: 'verify-jwt' },{ jwt }).toPromise();
        return requiredRoles.some((role) => user?.roles?.includes(role))
    }
}