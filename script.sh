#!/bin/bash

TOKEN="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjhSYk94bVhsMkdqVzE3c05WTzkxIiwiZW1haWwiOiJ0ZXN0MkB0ZXN0LmNvbSIsImlhdCI6MTc2MjExNTg5NCwiZXhwIjoxNzYyMTE5NDk0fQ.X3TW9DWyBeBnpT834EX0CDZ8FC6cqgdhiJG2f_JLns4"

echo "🔹 Creando productos..."

http POST :3000/api/products \
	Authorization:"Bearer $TOKEN" \
	name="PC GAMA MEDIA - RGB" \
	price:=700 \
	categories:='["PC Gamer", "Gama media"]' \
	description="PC Gamer para jugar todos los juegos actuales. Con RGB." \
	image="https://http2.mlstatic.com/D_NQ_NP_797406-MLA75459984140_042024-O.webp"

http POST :3000/api/products \
	Authorization:"Bearer $TOKEN" \
	name="Samsung Galaxy S25 Ultra" \
	price:=1200 \
	categories:='["Celular", "Premium"]' \
	description="Smartphone de gama alta con cámara profesional y rendimiento avanzado" \
	image="https://imgs.search.brave.com/7kyfAnQhn9G9Fjfq5p2ypLfAydi1vXW1Fw3im7tms1I/rs:fit:860:0:0:0/g:ce/a"

http POST :3000/api/products \
	Authorization:"Bearer $TOKEN" \
	name="RX 7600 XT 8 VRAM" \
	price:=320 \
	categories:='["Tarjetas Graficas", "Gama Media"]' \
	description="Tarjeta Grafica AMD Radeon RX 7600 XT 8 VRAM" \
	image="https://imgs.search.brave.com/QDit22yxeVGHNnGWlp7iUjoWajt_55rwDjFC1lbMKiQ/rs:fit:860:0:0:0/g:ce/a"

http POST :3000/api/products \
	Authorization:"Bearer $TOKEN" \
	name="Raton Asus" \
	price:=20 \
	categories:='["Periféricos", "Gamer"]' \
	description="Ratón gaming de alta precisión" \
	image="https://imgs.search.brave.com/4xpLbXtq9kHKKZmZH4PnXHttLouhMGVjEWW9ZLZGR_M/rs:fit:860:0:0:0/g:ce/a"

http POST :3000/api/products \
	Authorization:"Bearer $TOKEN" \
	name="Remera Deportiva" \
	price:=20 \
	categories:='["Deportes", "Fitness"]' \
	description="Remera GyM" \
	image="https://imgs.search.brave.com/GxMam_DrPh5sZRRwGVYzbg0t_LEXnKzh30epYIWwhTI/rs:fit:860:0:0:0/g:ce/a"

http POST :3000/api/products \
	Authorization:"Bearer $TOKEN" \
	name="Ryzen 5 8600G" \
	price:=180 \
	categories:='["CPU CON GRAFICOS", "Gama Media"]' \
	description="CPU" \
	image="https://imgs.search.brave.com/mkY8bo7bXpfv7-0OETuHVCO2kIcXPlYqqNnOGonq8RI/rs:fit:860:0:0:0/g:ce/a"

http POST :3000/api/products \
	Authorization:"Bearer $TOKEN" \
	name="Teclado Mecanico Redragon K552" \
	price:=30 \
	categories:='["Teclado", "Mecánico "]' \
	description="Interruptores rojos precisos. Iluminación RGB inmersiva y construcción premium." \
	image="https://m.media-amazon.com/images/I/71FSIp+tDNL._AC_SL1500_.jpg"

http POST :3000/api/products \
	Authorization:"Bearer $TOKEN" \
	name="Intel I7 14700x" \
	price:=200 \
	categories:='["CPU", "Gama ALTA"]' \
	description="CPU - PROCESADOR" \
	image="https://www.caseking.de/on/demandware.static/-/Sites-master-catalog-caseking/default/dw08cf796b/i"

http POST :3000/api/products \
	Authorization:"Bearer $TOKEN" \
	name="RX 9060 XT 8 VRAM" \
	price:=300 \
	categories:='["GPU", "Gama Media Alta"]' \
	description="Tarjeta de video para juegos actuales." \
	image="https://mexx-img-2019.s3.amazonaws.com/Placa-Video-Radeon-RX-9060-XT-8Gb-Asus-Dual_49655_1.jpeg"

http POST :3000/api/products \
	Authorization:"Bearer $TOKEN" \
	name="Laptop Gamer Lenovo" \
	price:=1000 \
	categories:='["Computadoras", "Electronica"]' \
	description="Laptop gama media" \
	image="https://cdn.mos.cms.futurecdn.net/tEtNuVTELX2NBGtz4uTSSZ-970-80.jpg.webp"

http POST :3000/api/products \
	Authorization:"Bearer $TOKEN" \
	name="RTX 5060 TI 16GB" \
	price:=460 \
	categories:='["GPU", "Gamer"]' \
	description="Tarjeta gráfica - Gama media" \
	image="https://imgs.search.brave.com/7DjpUOSzNrZXhQcPZ8LAFwKGgmkO3ga4nR3ROc2j-kc/rs:fit:860:0:0:0/g:ce/a"

http POST :3000/api/products \
	Authorization:"Bearer $TOKEN" \
	name="Guantes Nike Fitness" \
	price:=4 \
	categories:='["GyM", "Fitness"]' \
	description="Ideales para levantamiento de pesas y tus rutinas de ejercicio." \
	image="https://www.dexter.com.ar/on/demandware.static/-/Sites-365-dabra-catalog/default/dw30692432/produ"

http POST :3000/api/products \
	Authorization:"Bearer $TOKEN" \
	name="Smartwatch Mujer Reloj " \
	price:=20 \
	categories:='["Reloj", "Smartwatch "]' \
	description="Smartwatch Reloj Dorado Inteligente Bluetooth Touch Tactil para Celular" \
	image="https://productosintegra.com/wp-content/uploads/2019/06/D_NQ_NP_2X_985768-MLA73436765138_122023-F.webp"

http POST :3000/api/products \
	Authorization:"Bearer $TOKEN" \
	name="Camisa Lisa Negra" \
	price:=8 \
	categories:='["Ropa", "Moda"]' \
	description="Esta camisa de poplin es elegante y sofisticada." \
	image="https://andezoficial.com/wp-content/uploads/2024/10/camisa-lisa-negra.jpg"

http POST :3000/api/products \
	Authorization:"Bearer $TOKEN" \
	name="Intel I5 14400k" \
	price:=130 \
	categories:='["CPU", "Gama Media"]' \
	description="CPU" \
	image="https://rec-line.com/img/productos/800x800/bx8071514400_2.jpeg"

http POST :3000/api/products \
	Authorization:"Bearer $TOKEN" \
	name="Xiaomi – Black Shark" \
	price:=300 \
	categories:='["Celular", "Gamer"]' \
	description="Celular gamer" \
	image="https://files.tecnoblog.net/wp-content/uploads/2025/08/amanz-ifoqexzizfg-unsplash.jpg"

echo "✅ Todos los productos han sido enviados."
