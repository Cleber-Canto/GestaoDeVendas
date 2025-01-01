/*
  Warnings:

  - A unique constraint covering the columns `[pedidoId,produtoId]` on the table `PedidoProduto` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "PedidoProduto_pedidoId_produtoId_key" ON "PedidoProduto"("pedidoId", "produtoId");
