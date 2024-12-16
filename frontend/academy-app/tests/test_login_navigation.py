import logging
import time
from selenium import webdriver
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.action_chains import ActionChains
import os

def wait_for_page_load(driver):
    """Aguarda o carregamento completo da página."""
    WebDriverWait(driver, 30).until(
        lambda d: d.execute_script("return document.readyState") == "complete"
    )

def test_login_and_navigation():
    options = Options()
    # Usar o perfil do Chrome para carregar cookies e sessão existentes
    options.add_argument("user-data-dir=C:\\Users\\thiag\\AppData\\Local\\Google\\Chrome\\User Data")
    options.add_argument("profile-directory=Default")  # ou outro perfil se não for 'Default'
    options.add_argument("--start-maximized")
    
    # Inicializa o WebDriver
    driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=options)

    # Lista de páginas para navegação
    pages = [
        ("/dashboards", "Dashboards"),
        ("/areas", "Áreas"),
        ("/usuarios", "Usuários"),
        ("/avaliacao", "Avaliação")
    ]

    try:
        # Configuração de logs
        logging.basicConfig(
            level=logging.INFO,
            format="%(asctime)s [%(levelname)s] %(message)s",
            handlers=[logging.StreamHandler()]
        )

        # Acessa a página inicial
        logging.info("Acessando a aplicação...")
        driver.get("http://localhost:3000")
        
        # Log da URL inicial
        logging.info(f"URL inicial: {driver.current_url}")
        
        # Caso já esteja logado, o código deve prosseguir para a página de frequencia
        if "/frequencia" not in driver.current_url:
            logging.info("Usuário não logado, realizando o login...")
            # Preencher o formulário de login
            WebDriverWait(driver, 30).until(EC.presence_of_element_located((By.ID, "email"))).send_keys("admin@gmail.com")
            driver.find_element(By.ID, "password").send_keys("123456")
            driver.find_element(By.XPATH, "//button[contains(text(), 'Entrar')]").click()

            # Aguardar redirecionamento após login
            WebDriverWait(driver, 30).until(EC.url_contains("/frequencia"))
            logging.info(f"URL após login: {driver.current_url}")
            logging.info("Login realizado com sucesso e redirecionado para frequência.")
        else:
            logging.info("Usuário já está logado.")

        # Navegar pelas páginas
        for href, page_name in pages:
            logging.info(f"Navegando para a página de {page_name}...")
            
            # Encontrar e clicar no link da página
            frequencia_link = WebDriverWait(driver, 30).until(
                EC.element_to_be_clickable((By.XPATH, f"//a[@href='{href}']"))
            )
            frequencia_link.click()

            # Aguardar o carregamento da página
            WebDriverWait(driver, 30).until(EC.url_contains(href))
            wait_for_page_load(driver)
            
            # Log da URL da página
            logging.info(f"URL da página {page_name}: {driver.current_url}")
            
            # Pequeno atraso para garantir navegação suave
            time.sleep(2)

            logging.info(f"Navegação para a página de {page_name} concluída com sucesso!")

        logging.info("Teste de navegação completo com sucesso!")

    except Exception as e:
        logging.error("Erro durante o teste:", exc_info=True)
        # Captura uma screenshot em caso de erro
        driver.save_screenshot("error_screenshot.png")

    finally:
        driver.quit()
        logging.info("Driver encerrado.")

if __name__ == "__main__":
    test_login_and_navigation()