-- CreateTable
CREATE TABLE "Role" (
    "id" SERIAL NOT NULL,
    "nome" VARCHAR(255) NOT NULL,
    "descricao" VARCHAR(255) NOT NULL,

    CONSTRAINT "Role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UsuarioRole" (
    "id" SERIAL NOT NULL,
    "usuarioId" INTEGER NOT NULL,
    "roleId" INTEGER NOT NULL,

    CONSTRAINT "UsuarioRole_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UsuarioRole" ADD CONSTRAINT "UsuarioRole_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsuarioRole" ADD CONSTRAINT "UsuarioRole_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
