import Elysia, { t } from "elysia";
import { db } from "../db";
import { JsonArray } from "@prisma/client/runtime/library";
import jwt from "@elysiajs/jwt";

const accessPlugin = new Elysia()
  .use(
        jwt({
          name: 'jwt',
          secret: Bun.env.JWT_SECRET!,
        })
      )
  .derive({ as: 'scoped' }, async ({ headers, jwt, set }) => {
    let _authToken = headers.authorization?.split(' ')[1];
    if (!_authToken) {
      // handle error for access token is not available
      set.status = "Unauthorized";
      throw new Error("Acceso denegado, no se ha proporcionado el token de acceso");
    }
    const jwtPayload = await jwt.verify(_authToken);
    if (!jwtPayload) {
      // handle error for access token is tempted or incorrect
      set.status = "Forbidden";
      throw new Error("Acceso denegado, el token de acceso no es válido");
    }

    const userId = jwtPayload.sub;
    const user = await db.user.findUnique({id: userId,});

    if (!user) {
      // handle error for user not found from the provided access token
      set.status = "Forbidden";
      throw new Error("Acceso denegado, el usuario no existe");
    }
      const apiKey = headers["api-key"]
      if (!apiKey) {
        // handle error for access token is not available
        set.status = "Unauthorized";
        throw new Error("Acceso denegado, no se ha proporcionado api-key");
      }

      // const parking = await db.parking.findUnique({
      //   where: {
      //     id: apiKey,
      //   },
      // });

      // if (!parking) {
      //   // handle error for parking not found from the provided access token
      //   set.status = "Forbidden";
      //   throw new Error("El parkeo no existe ");
      // }

      // const employee = await db.employee.findFirst({
      //   where: {
      //     userId: user.id,
      //     companyId: parking.companyId,
      //   },
      // });

      // if (!employee) {
      //   // handle error for employee not found from the provided access token
      //   set.status = "Forbidden";
      //   throw new Error("No tiene acceso a este parkeo");
      // }
      // if ((employee.assignedParkings as JsonArray).indexOf(apiKey) === -1) {
      //   // handle error for employee not found from the provided access token
      //   set.status = "Forbidden";
      //   throw new Error("Acceso no autorizado");
      // }


      // if (employee.userId !== user.id) {
      //   // handle error for employee not found from the provided access token
      //   set.status = "Forbidden";
      //   throw new Error("Acceso no autorizado");
      // }
      
      // const company = await db.company.findUnique({
      //   where: {
      //     id: employee.companyId,
      //   },
      // });

      // if (!company) {
      //   // handle error for company not found from the provided access token
      //   set.status = "Forbidden";
      //   throw new Error("Acceso no autorizado");
      // }
      return {
        // user,
        // company,
        // employee,
        // parking,
      };
    });

export { accessPlugin };