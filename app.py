import subprocess
from scour import scour
import xml.etree.ElementTree as ET
from svg.path import parse_path, Line, CubicBezier, QuadraticBezier, Arc
from simplification.cutil import simplify_coords

def simplificar_svg(input_file, output_file, tolerance=2.0):
    """
    Simplifica un SVG generado por Potrace reduciendo los puntos de sus paths.
    
    Parámetros:
    - input_file: ruta del SVG original
    - output_file: ruta del SVG simplificado
    - tolerance: nivel de simplificación (mayor = más simple)
    """
    # 1. Cargar el SVG
    tree = ET.parse(input_file)
    root = tree.getroot()
    
    # 2. Encontrar todos los <path>
    ns = {"svg": "http://www.w3.org/2000/svg"}
    for path_elem in root.findall(".//svg:path", ns):
        d = path_elem.attrib['d']
        path = parse_path(d)
        
        # 3. Convertir a lista de puntos
        points = []
        for seg in path:
            if isinstance(seg, Line):
                points.append((seg.start.real, seg.start.imag))
                points.append((seg.end.real, seg.end.imag))
            else:
                # Para curvas, muestrear puntos
                for t in range(0, 11):
                    pt = seg.point(t/10)
                    points.append((pt.real, pt.imag))

        # 4. Simplificar los puntos
        simplified_points = simplify_coords(points, epsilon=tolerance)

        # 5. Reconstruir path con líneas
        if simplified_points:
            new_d = f"M {simplified_points[0][0]} {simplified_points[0][1]} "
            for x, y in simplified_points[1:]:
                new_d += f"L {x} {y} "
            new_d += "Z"  # cerrar path
            path_elem.attrib['d'] = new_d

    # 6. Guardar SVG simplificado
    tree.write(output_file)
    print(f"SVG simplificado guardado en: {output_file}")


def convertir_a_svg(ruta_png, ruta_svg):
    # potrace solo acepta PBM/PGM/PPM → convertimos con imagemagick
    temp_pbm = "temp.pbm"
    subprocess.run(["C:\\Program Files\\ImageMagick-7.1.2-Q16-HDRI\\magick.exe",
                ruta_png,
                temp_pbm])
  # convertir a PBM

    # ejecutar potrace
    subprocess.run([r"C:/Users/Mercurio5\Documents/ProyectosPropios/potrace-1.16.win64/potrace.exe", temp_pbm, "-s", "-o", ruta_svg])

    print("SVG generado en:", ruta_svg)

#convertir_a_svg("cora.png", "cora.svg")


simplificar_svg("cora.svg", "cora_c.svg", tolerance=2.0)