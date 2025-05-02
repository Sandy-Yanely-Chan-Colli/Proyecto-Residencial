import React, { useState, useRef } from 'react';
import styles from './ReporteSpa.module.css';

// Importación de imágenes SVG

import calenderIcon from './Spalogos/calender.svg'; import pisiIcon from './Spalogos/pisi.svg'; import personIcon from './Spalogos/person.svg'; import lostIcon from './Spalogos/lost.svg';

interface FormData {
  service?: string;
  firstName?: string;
  lastNameP?: string;
  lastNameM?: string;
  rkey?: string;
  phone?: string;
  reportDetails?: string;
  relevance?: string;
  file?: File | null;
  lostItem?: string;
  lostDescription?: string;
  lostArea?: string;
  lostImage?: string | ArrayBuffer | null;
  deliveryOption?: string;
}

const ReporteSpa: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [formData, setFormData] = useState<FormData>({});
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Objeto con las imágenes importadas
  const servicesImages = {
    service1: calenderIcon,
    service2: pisiIcon,
    service3: personIcon,
    service4: lostIcon
  };

  const selectService = (service: string) => {
    setFormData(prev => ({ ...prev, service }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFormData(prev => ({ ...prev, file }));

      // Crear vista previa de la imagen
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const nextStep = (step: number) => {
    if (step === 2 && !formData.service) {
      alert("Por favor selecciona un servicio para proceder 🤗");
      return;
    }
    setCurrentStep(step);
  };

  const prevStep = (step: number) => {
    setCurrentStep(step);
  };

  const validateAndNext = (step: number) => {
    const { firstName, lastNameP, lastNameM, rkey, phone } = formData;
    if (!firstName || !lastNameP || !lastNameM || !rkey || !phone) {
      alert("Por favor verifica que ningún campo esté vacío 😟");
      return;
    }
    nextStep(step);
  };

  const submitForm = () => {
    if (formData.service === 'service4' && (!formData.lostItem || !formData.lostDescription || !formData.lostArea)) {
      alert("Por favor completa todos los campos obligatorios para objetos perdidos");
      return;
    }
    
    console.log("Formulario enviado:", formData);
    nextStep(4);
  };

  const restartForm = () => {
    setFormData({});
    setCurrentStep(1);
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.progressContainer}>
        {[1, 2, 3, 4].map((step) => (
          <div
            key={step}
            className={`${styles.progressCircle} ${currentStep >= step ? styles.active : ''}`}
          />
        ))}
      </div>

      {/* Paso 1: Selección de servicio */}
      <div className={`${styles.step} ${currentStep === 1 ? styles.active : ''}`}>
        <h2>Servicios brindados por el SPA</h2>
        <div className={styles.services}>
          {[
            { id: 'service1', name: 'Citas', image: servicesImages.service1 },
            { id: 'service2', name: 'Instalaciones', image: servicesImages.service2 },
            { id: 'service3', name: 'Personal', image: servicesImages.service3 },
            { id: 'service4', name: 'Objetos Perdidos', image: servicesImages.service4 }
          ].map((service) => (
            <div
              key={service.id}
              className={`${styles.service} ${formData.service === service.id ? styles.selected : ''}`}
              onClick={() => selectService(service.id)}
            >
              <img src={service.image} alt={service.name} className={styles.serviceIcon} />
              <p>{service.name}</p>
            </div>
          ))}
        </div>
        <button onClick={() => nextStep(2)} className={styles.nextButton}>Siguiente</button>
      </div>

      {/* Paso 2: Datos personales */}
      <div className={`${styles.step} ${currentStep === 2 ? styles.active : ''}`}>
        <h2>Datos Personales</h2>
        <p>Por favor, asegúrese de que todos los datos proporcionados sean correctos 😊</p>
        <div className={styles.formContainer}>
          <div className={styles.formGroup}>
            <label htmlFor="firstName" className={styles.formLabel}>Nombres</label>
            <input
              id="firstName"
              type="text"
              placeholder="Nombres"
              required
              value={formData.firstName || ''}
              onChange={handleInputChange}
              className={styles.formInput}
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="lastNameP" className={styles.formLabel}>Apellido Paterno</label>
            <input
              id="lastNameP"
              type="text"
              placeholder="Apellido Paterno"
              required
              value={formData.lastNameP || ''}
              onChange={handleInputChange}
              className={styles.formInput}
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="lastNameM" className={styles.formLabel}>Apellido Materno</label>
            <input
              id="lastNameM"
              type="text"
              placeholder="Apellido Materno"
              required
              value={formData.lastNameM || ''}
              onChange={handleInputChange}
              className={styles.formInput}
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="rkey" className={styles.formLabel}>Rkey</label>
            <input
              id="rkey"
              type="text"
              placeholder="Rkey"
              required
              value={formData.rkey || ''}
              onChange={handleInputChange}
              className={styles.formInput}
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="phone" className={styles.formLabel}>Teléfono</label>
            <input
              id="phone"
              type="tel"
              placeholder="Teléfono"
              required
              value={formData.phone || ''}
              onChange={handleInputChange}
              className={styles.formInput}
            />
          </div>
        </div>
        <div className={styles.buttonGroup}>
          <button onClick={() => prevStep(1)} className={styles.backButton}>Regresar</button>
          <button onClick={() => validateAndNext(3)} className={styles.nextButton}>Siguiente</button>
        </div>
      </div>

      {/* Paso 3: Detalles del reporte */}
      <div className={`${styles.step} ${currentStep === 3 ? styles.active : ''}`}>
        <h2>Detalles del Reporte</h2>
        <div className={styles.reportForm}>
          {formData.service === 'service1' && (
            <div className={styles.serviceForm}>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Detalles del reporte</label>
                <textarea
                  placeholder="Ingrese los detalles del reporte..."
                  value={formData.reportDetails || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, reportDetails: e.target.value }))}
                  className={styles.formTextarea}
                />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Relevancia</label>
                <select
                  value={formData.relevance || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, relevance: e.target.value }))}
                  className={styles.formSelect}
                >
                  <option value="">Seleccione una opción</option>
                  <option value="low">Baja</option>
                  <option value="medium">Media</option>
                  <option value="high">Alta</option>
                </select>
              </div>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Adjuntar archivo</label>
                <input 
                  type="file" 
                  onChange={handleFileChange}
                  className={styles.fileInput}
                />
              </div>
            </div>
          )}

          {formData.service === 'service2' && (
            <div className={styles.serviceForm}>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Descripción del problema en instalaciones</label>
                <textarea
                  placeholder="Describe el problema con las instalaciones..."
                  value={formData.reportDetails || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, reportDetails: e.target.value }))}
                  className={styles.formTextarea}
                  required
                />
              </div>
            </div>
          )}

          {formData.service === 'service3' && (
            <div className={styles.serviceForm}>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Reporte sobre personal</label>
                <textarea
                  placeholder="Describe tu reporte sobre el personal..."
                  value={formData.reportDetails || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, reportDetails: e.target.value }))}
                  className={styles.formTextarea}
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Evidencia (opcional)</label>
                <input 
                  type="file" 
                  onChange={handleFileChange}
                  className={styles.fileInput}
                />
              </div>
            </div>
          )}

          {formData.service === 'service4' && (
            <div className={styles.lostItemForm}>
              <div className={styles.formGroup}>
                <label htmlFor="lostItem" className={styles.formLabel}>Artículo perdido</label>
                <input
                  id="lostItem"
                  type="text"
                  placeholder="Ingrese el nombre del artículo perdido"
                  required
                  value={formData.lostItem || ''}
                  onChange={handleInputChange}
                  className={styles.formInput}
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="lostDescription" className={styles.formLabel}>Descripción</label>
                <textarea
                  id="lostDescription"
                  placeholder="Detalles del artículo perdido"
                  required
                  value={formData.lostDescription || ''}
                  onChange={handleInputChange}
                  className={styles.formTextarea}
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="lostArea" className={styles.formLabel}>Área donde estuvo</label>
                <select
                  id="lostArea"
                  required
                  value={formData.lostArea || ''}
                  onChange={handleInputChange}
                  className={styles.formSelect}
                >
                  <option value="">Selecciona un área</option>
                  <option value="sauna">Sauna</option>
                  <option value="piscinas">Piscinas</option>
                  <option value="duchas">Duchas</option>
                  <option value="pedicura">Pedicura</option>
                  <option value="vestuarios">Vestuarios</option>
                  <option value="masajes">Masajes</option>
                </select>
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="lostImage" className={styles.formLabel}>Imagen del Artículo</label>
                <input
                  id="lostImage"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  ref={fileInputRef}
                  required
                  className={styles.fileInput}
                />
                {imagePreview && (
                  <div className={styles.imagePreviewContainer}>
                    <h4 className={styles.previewTitle}>Vista Previa:</h4>
                    <img 
                      src={imagePreview} 
                      alt="Vista previa" 
                      className={styles.imagePreview}
                    />
                  </div>
                )}
              </div>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Opciones de Entrega</label>
                <div className={styles.radioGroup}>
                  <label className={styles.radioLabel}>
                    <input
                      type="radio"
                      name="deliveryOption"
                      value="entrada"
                      checked={formData.deliveryOption === 'entrada'}
                      onChange={handleInputChange}
                      className={styles.radioInput}
                    />
                    Entrada
                  </label>
                  <label className={styles.radioLabel}>
                    <input
                      type="radio"
                      name="deliveryOption"
                      value="spa"
                      checked={formData.deliveryOption === 'spa'}
                      onChange={handleInputChange}
                      className={styles.radioInput}
                    />
                    SPA
                  </label>
                  <label className={styles.radioLabel}>
                    <input
                      type="radio"
                      name="deliveryOption"
                      value="domicilio"
                      checked={formData.deliveryOption === 'domicilio'}
                      onChange={handleInputChange}
                      className={styles.radioInput}
                    />
                    En su domicilio
                  </label>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className={styles.buttonGroup}>
          <button onClick={() => prevStep(2)} className={styles.backButton}>Regresar</button>
          <button onClick={submitForm} className={styles.submitButton}>Enviar</button>
        </div>
      </div>

      {/* Paso 4: Confirmación */}
      <div className={`${styles.step} ${currentStep === 4 ? styles.active : ''}`}>
        <h2>Confirmación</h2>
        <div className={styles.checkmarkContainer}>
          <svg className={styles.checkmarkSvg} viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
            <circle className={styles.circle} cx="60" cy="60" r="55" />
            <path className={styles.checkmark} d="M35,60 L50,75 L85,40" />
          </svg>
        </div>
        <p className={styles.successMessage}>Tu reporte ha sido enviado con éxito 🎉</p>
        <div className={styles.reportSummary}>
          <h3>Resumen del reporte:</h3>
          <p><strong>Servicio:</strong> {formData.service === 'service1' ? 'Citas' : 
                                     formData.service === 'service2' ? 'Instalaciones' : 
                                     formData.service === 'service3' ? 'Personal' : 
                                     'Objetos Perdidos'}</p>
          
          <p><strong>Nombre:</strong> {formData.firstName} {formData.lastNameP} {formData.lastNameM}</p>
          <p><strong>Rkey:</strong> {formData.rkey}</p>
          <p><strong>Teléfono:</strong> {formData.phone}</p>
          
          {formData.service === 'service4' && (
            <>
              <p><strong>Artículo:</strong> {formData.lostItem}</p>
              <p><strong>Área:</strong> {formData.lostArea}</p>
              <p><strong>Entrega:</strong> {formData.deliveryOption === 'entrada' ? 'Entrada' : 
                                          formData.deliveryOption === 'spa' ? 'SPA' : 
                                          'Domicilio'}</p>
            </>
          )}
        </div>
        <button onClick={restartForm} className={styles.restartButton}>Generar otro reporte</button>
      </div>
    </div>
  );
};

export default ReporteSpa;