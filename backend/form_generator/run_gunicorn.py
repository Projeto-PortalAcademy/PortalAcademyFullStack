# from gunicorn.app.base import BaseApplication
# from multiprocessing import cpu_count

# class StandaloneApplication(BaseApplication):
#     def __init__(self, app, options=None):
#         self.options = options or {}
#         self.application = app
#         super().__init__()

#     def load_config(self):
#         for key, value in self.options.items():
#             if key in self.cfg.settings and value is not None:
#                 self.cfg.set(key.lower(), value)

#     def load(self):
#         return self.application

# if __name__ == "__main__":
#     from form_generator.app import app
    
#     options = {
#         "bind": "0.0.0.0:8000",
#         "workers": 4,
#         "worker_class": "uvicorn.workers.UvicornWorker",
#         "timeout": 120,
#         "keepalive": 10,
#         "loglevel": "debug",
#     }
    
#     StandaloneApplication(app, options).run()