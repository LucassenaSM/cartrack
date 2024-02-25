import cv2
import pytesseract
import re
import time
from collections import Counter

# Dicionário para armazenar as placas lidas
plates_read = {}

# Caminho para o executável do Tesseract
pytesseract.pytesseract.tesseract_cmd = r'C:\Program Files\Tesseract-OCR\tesseract.exe'

# Inicializa a captura de vídeo 
cap = cv2.VideoCapture(0)

while True:
    ret, frame = cap.read()

    if ret:
        gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
        _, thresh = cv2.threshold(gray, 100, 150, cv2.THRESH_BINARY)
        blur = cv2.GaussianBlur(thresh, (5, 5), 1)

        edges = cv2.Canny(blur, 100, 100, apertureSize=7)
        contours, _ = cv2.findContours(edges.copy(), cv2.RETR_TREE, cv2.CHAIN_APPROX_SIMPLE)

        # Limite mínimo da área do contorno
        min_contour_area = 0

        # Ordena os contornos por área em ordem decrescente
        contours = sorted(contours, key=cv2.contourArea, reverse=True)

        for contour in contours:
            contour_area = cv2.contourArea(contour)
            if contour_area < min_contour_area:
                continue

            x, y, w, h = cv2.boundingRect(contour)
            possible_plate = frame[y:y+h, x:x+w]

            # Lista para armazenar as leituras
            readings = []

            # Lê a placa 10 vezes
            for _ in range(10):
                text = pytesseract.image_to_string(possible_plate, config='--psm 6')
                match = re.search(r'([A-Za-z]{3}-\d{4}|[A-Za-z]{3} \d{4}|[A-Za-z]{3}\d[A-Za-z]\d{2})', text)
                if match:
                    print (match)
                    readings.append(match.group())

            # Verifica qual leitura ocorre com mais frequência
            most_common_reading = None
            if readings:
                most_common_reading = Counter(readings).most_common(1)[0][0]


            if most_common_reading and most_common_reading in plates_read and time.time() - plates_read[most_common_reading] < 60:
                continue

            if most_common_reading:
                plates_read[most_common_reading] = time.time()
                plate = possible_plate
                cv2.imshow("Plate", plate)
                print(most_common_reading)
                cv2.imwrite('placa.png', plate)
                
                #time.sleep(10)
                break
          
    else:
        print("Não foi possível capturar a imagem")
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break
    
    
cap.release()
cv2.destroyAllWindows()
