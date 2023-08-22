import { Router } from "express";
import { callCart } from "../dao/index.js";
import { productService } from "../dao/index.js";
const router = Router();

//Agregar carrito
router.post("/", async (req, res) => {
  try {
    const result = await callCart.addCart();
    if (result) {
      res.json({ status: "success", message: "Carrito agregado" });
    } else {
      res.json({
        status: "success",
        message: "El carrito no ha sido agregado correctamente",
      });
    }
  } catch (error) {
    res.send(error.message);
  }
});
//Obtener carrito por id
router.get("/:cid", async (req, res) => {
  try {
    const cid = req.params.cid;
    const result = await callCart.getCartById(cid);
    if (result) {
      res.json({ status: "success", payload: result });
    } else {
      res.json({ status: "error", message: "ha ocurrido un error" });
    }
  } catch (error) {
    res.send(error.message);
  }
});
// Agregar producto al carrito por id
router.post("/:cid/product/:pid", async (req, res) => {
  try {
    const cid = req.params.cid;
    const pid = req.params.pid;
    const exist = await productService.existsProduct(pid);
    if (exist) {
      const result = await callCart.addProductById(cid, pid);
      if (result) {
        res.json({ status: "success", message: "Producto agregado" });
      } else {
        res.json({ status: "error", message: "Ha ocurrido un error" });
      }
    } else {
      res.json({ status: "error", message: "Producto no encontrado" });
    }
  } catch (error) {
    res.send(error.message);
  }
});
//Eliminar producto del carrito por id
router.delete("/:cid/product/:pid", async (req, res) => {
  try {
    const cid = req.params.cid;
    const pid = req.params.pid;
    const result = await callCart.deleteProductFromCart(cid, pid);
    if (result) {
      res.json({
        status: "success",
        message: "El producto ha sido eliminado correctamente",
      });
    } else {
      res.json({ status: "error", message: "ha ocurrido un error" });
    }
  } catch (error) {
    res.send(error.message);
  }
});
//Eliminar todos los productos del carrito
router.delete("/:cid", async (req, res) => {
  try {
    const cid = req.params.cid;
    const result = await callCart.deleteAllProductsFromCart(cid);
    if (result) {
      res.json({
        status: "success",
        message: "Los productos del carrito han sido eliminados correctamente",
      });
    } else {
      res.json({ status: "error", message: "ha ocurrido un error" });
    }
  } catch (error) {
    res.send(error.message);
  }
});
//Actualizar todos los productos del carrito
router.put("/:cid", async (req, res) => {
  try {
    const cid = req.params.cid;
    const prods = req.body;
    const result = await callCart.updateAllProductsFromCart(cid, prods);
    if (result) {
      res.json({
        status: "success",
        message:
          "Los productos del carrito han sido actualizados correctamente",
      });
    } else {
      res.json({ status: "error", message: "ha ocurrido un error" });
    }
  } catch (error) {
    res.send(error.message);
  }
});
//Actualizar la cantidad de un producto en el carrito
router.put("/:cid/product/:pid", async (req, res) => {
  try {
    const cid = req.params.cid;
    const pid = req.params.pid;
    const body = req.body;
    const quant = body.quantity;
    const result = await callCart.updateQuantity(cid, pid, quant);
    if (result) {
      res.json({
        status: "success",
        message: "La cantidad del producto ha sido actualizada correctamente",
      });
    } else {
      res.json({ status: "error", message: "ha ocurrido un error" });
    }
  } catch (error) {
    res.send(error.message);
  }
});

export { router as cartsRouter };
