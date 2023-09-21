from rest_framework.response import Response
from rest_framework.generics import GenericAPIView
from .serializers import MySerializer
from minify_html import minify


class Compress(GenericAPIView):
    serializer_class = MySerializer

    def post(self, request):
        serializer = MySerializer(data=request.data)
        if serializer.is_valid():
            data_str = serializer.validated_data.get('data_file')
            compressed_data_str = minify(
                code=data_str,
                do_not_minify_doctype=False,
                keep_html_and_head_opening_tags=True,
                minify_js=True,
                minify_css=True,
                keep_closing_tags=True
            )

            response = Response(data=compressed_data_str)
            return response

        else:
            raise Exception(serializer.errors)
